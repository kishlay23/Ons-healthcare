import { Router, Request, Response, NextFunction } from 'express'
import { authService } from '../services/auth.service'
import { auth, AuthRequest } from '../middleware/auth'
import { ValidationError } from '../utils/errors'

const router = Router()

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, phone, age, gender, password, confirmPassword } = req.body
    if (!firstName || !lastName || !email || !phone || !password)
      throw new ValidationError('Missing required fields')
    if (password !== confirmPassword)
      throw new ValidationError('Passwords do not match')
    if (password.length < 6)
      throw new ValidationError('Password must be at least 6 characters')

    const result = await authService.signup({ firstName, lastName, email, phone, age: age ? +age : undefined, gender, password })
    res.status(201).json({ message: 'Account created successfully', ...result })
  } catch (e) { next(e) }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw new ValidationError('Email and password required')
    const result = await authService.login({ email, password })
    res.json({ message: 'Login successful', ...result })
  } catch (e) { next(e) }
})

router.post('/logout', (_req, res) => res.json({ message: 'Logged out successfully' }))

router.get('/me', auth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getUserById(req.user!.userId)
    res.json({ user })
  } catch (e) { next(e) }
})

// profile alias
router.get('/profile', auth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getUserById(req.user!.userId)
    res.json({ user })
  } catch (e) { next(e) }
})

export default router
