import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  res.on('finish', () =>
    logger.info(`${req.method} ${req.path} → ${res.statusCode} (${Date.now() - start}ms)`)
  )
  next()
}
