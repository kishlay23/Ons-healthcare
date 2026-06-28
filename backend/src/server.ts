import express from 'express'
import cors from 'cors'
import { errorHandler } from './middleware/errorHandler'
import { requestLogger } from './middleware/logging'
import routes from './routes'

const app = express()

app.use(cors({
  origin: ['http://localhost:3000', 'http://172.30.176.1:3000', '*'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

app.get('/health', (_req, res) => res.json({ status: 'OK', db: 'SQLite', time: new Date().toISOString() }))

app.use('/api', routes)

app.use((_req, res) => res.status(404).json({ message: 'Route not found' }))
app.use(errorHandler)

export default app
