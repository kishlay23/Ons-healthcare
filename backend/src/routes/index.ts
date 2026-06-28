import { Router } from 'express'
import authRoutes     from './auth'
import treatmentRoutes from './treatments'
import machineRoutes  from './machines'
import storyRoutes    from './stories'
import bookingRoutes  from './bookings'

const router = Router()

router.use('/auth',       authRoutes)
router.use('/treatments', treatmentRoutes)
router.use('/machines',   machineRoutes)
router.use('/stories',    storyRoutes)
router.use('/bookings',   bookingRoutes)

export default router
