import { Router, Request, Response, NextFunction } from 'express'
import { machineService } from '../services/machine.service'
import { auth, adminOnly, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try { res.json(await machineService.getAll(req.query.specialty as string | undefined)) }
  catch (e) { next(e) }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try { res.json(await machineService.getById(req.params.id)) }
  catch (e) { next(e) }
})

router.post('/', auth, adminOnly, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { res.status(201).json(await machineService.create(req.body)) }
  catch (e) { next(e) }
})

router.put('/:id', auth, adminOnly, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { res.json(await machineService.update(req.params.id, req.body)) }
  catch (e) { next(e) }
})

router.delete('/:id', auth, adminOnly, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { res.json(await machineService.delete(req.params.id)) }
  catch (e) { next(e) }
})

export default router
