import { Request, Response, NextFunction } from 'express'
import { verifyToken, JwtPayload } from '../utils/jwt'
import { UnauthorizedError, ForbiddenError } from '../utils/errors'

export interface AuthRequest extends Request {
  user?: JwtPayload
}

export const auth = (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) throw new UnauthorizedError('No token provided')
    const payload = verifyToken(header.slice(7))
    if (!payload) throw new UnauthorizedError('Invalid or expired token')
    req.user = payload
    next()
  } catch (e) { next(e) }
}

export const adminOnly = (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new UnauthorizedError()
    if (req.user.role !== 'ADMIN') throw new ForbiddenError('Admin access required')
    next()
  } catch (e) { next(e) }
}
