import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/errors'
import { logger } from '../utils/logger'

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.message, err)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  res.status(500).json({ message: 'Internal server error' })
}
