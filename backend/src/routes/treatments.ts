import { Router, Request, Response, NextFunction } from 'express'
import { treatmentService } from '../services/treatment.service'
import { auth, adminOnly, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await treatmentService.getAll(req.query.specialty as string | undefined)
    res.json(data)
  } catch (e) { next(e) }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try { res.json(await treatmentService.getById(req.params.id)) }
  catch (e) { next(e) }
})

router.post('/', auth, adminOnly, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { res.status(201).json(await treatmentService.create(req.body)) }
  catch (e) { next(e) }
})

router.put('/:id', auth, adminOnly, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { res.json(await treatmentService.update(req.params.id, req.body)) }
  catch (e) { next(e) }
})

router.delete('/:id', auth, adminOnly, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { res.json(await treatmentService.delete(req.params.id)) }
  catch (e) { next(e) }
})

export default router
