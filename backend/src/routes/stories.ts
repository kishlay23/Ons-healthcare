import { Router, Request, Response, NextFunction } from 'express'
import { storyService } from '../services/story.service'
import { auth, adminOnly, AuthRequest } from '../middleware/auth'

const router = Router()

// Public
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try { res.json(await storyService.getPublished(req.query.specialty as string | undefined)) }
  catch (e) { next(e) }
})

router.get('/featured', async (_req, res: Response, next: NextFunction) => {
  try { res.json(await storyService.getFeatured()) }
  catch (e) { next(e) }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try { res.json(await storyService.getById(req.params.id)) }
  catch (e) { next(e) }
})

// Auth required to submit
router.post('/', auth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const story = await storyService.submit(req.user!.userId, req.body)
    res.status(201).json({ message: 'Story submitted for review', data: story })
  } catch (e) { next(e) }
})

// Admin
router.get('/admin/all', auth, adminOnly, async (_req, res: Response, next: NextFunction) => {
  try { res.json(await storyService.getAll()) }
  catch (e) { next(e) }
})

router.patch('/admin/:id', auth, adminOnly, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status, featured } = req.body
    let result
    if (status === 'PUBLISHED') result = await storyService.approve(req.params.id, featured)
    else if (status === 'REJECTED') result = await storyService.reject(req.params.id)
    else result = await storyService.updateStatus(req.params.id, status)
    res.json(result)
  } catch (e) { next(e) }
})

export default router
