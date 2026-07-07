import { PrismaClient } from '@prisma/client'
import { logger } from '../utils/logger'

const prisma = new PrismaClient()

export const connectDatabase = async () => {
  try {
    await prisma.$connect()
    logger.info('✅ PostgreSQL database connected')
  } catch (err) {
    logger.error('❌ Database connection failed', err)
    process.exit(1)
  }
}

export default prisma
