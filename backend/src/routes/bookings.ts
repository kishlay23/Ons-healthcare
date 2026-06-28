import { Router, Request, Response, NextFunction } from 'express'
import { bookingService } from '../services/booking.service'
import { auth, adminOnly, AuthRequest } from '../middleware/auth'
import { ValidationError } from '../utils/errors'

const router = Router()

// Available slots
router.get('/available-slots', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { therapistId, date } = req.query
    if (!therapistId || !date) throw new ValidationError('therapistId and date are required')
    res.json(await bookingService.getAvailableSlots(therapistId as string, date as string))
  } catch (e) { next(e) }
})

// Therapists list (for booking form)
router.get('/therapists', async (_req, res: Response, next: NextFunction) => {
  try { res.json(await bookingService.getTherapists()) }
  catch (e) { next(e) }
})

// Patient's bookings
router.get('/patient', auth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { res.json(await bookingService.getPatientBookings(req.user!.userId)) }
  catch (e) { next(e) }
})

// Admin: all bookings
router.get('/admin/all', auth, adminOnly, async (_req, res: Response, next: NextFunction) => {
  try { res.json(await bookingService.getAllAdmin()) }
  catch (e) { next(e) }
})

// Create booking
router.post('/', auth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { therapistId, treatmentId, date, time, notes } = req.body
    if (!therapistId || !treatmentId || !date || !time)
      throw new ValidationError('therapistId, treatmentId, date and time are required')
    const booking = await bookingService.create(req.user!.userId, therapistId, treatmentId, date, time, notes)
    res.status(201).json({ message: 'Appointment booked', data: booking })
  } catch (e) { next(e) }
})

// Get single booking
router.get('/:id', auth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { res.json(await bookingService.getById(req.params.id)) }
  catch (e) { next(e) }
})

// Cancel
router.delete('/:id', auth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { res.json(await bookingService.cancel(req.params.id, req.body.reason)) }
  catch (e) { next(e) }
})

// Admin: update status
router.patch('/admin/:id', auth, adminOnly, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try { res.json(await bookingService.updateStatus(req.params.id, req.body.status)) }
  catch (e) { next(e) }
})

export default router
