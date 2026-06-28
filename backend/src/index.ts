import 'dotenv/config'
import app from './server'
import { connectDatabase } from './config/database'
import { logger } from './utils/logger'

const PORT = process.env.PORT || 5000

async function start() {
  await connectDatabase()

  const server = app.listen(PORT, () => {
    logger.info(`🚀 ONS Healthcare API → http://localhost:${PORT}`)
    logger.info(`   DB: SQLite (prisma/dev.db)`)
    logger.info(`   Health: http://localhost:${PORT}/health`)
  })

  const shutdown = (sig: string) => {
    logger.info(`${sig} — shutting down`)
    server.close(() => process.exit(0))
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT',  () => shutdown('SIGINT'))
}

start().catch((e) => { logger.error('Startup failed', e); process.exit(1) })
