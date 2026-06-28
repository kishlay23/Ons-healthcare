require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const treatmentRoutes = require('./routes/treatments')
const machineRoutes = require('./routes/machines')
const storyRoutes = require('./routes/stories')
const bookingRoutes = require('./routes/bookings')

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://172.30.176.1:3000', '*'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Request logger (dev) ──────────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/treatments', treatmentRoutes)
app.use('/api/machines', machineRoutes)
app.use('/api/stories', storyRoutes)
app.use('/api/bookings', bookingRoutes)

// Admin route aliases (frontend calls /api/admin/...)
app.use('/api/admin/bookings', (req, res, next) => {
  req.url = '/admin' + (req.url === '/' ? '/all' : req.url)
  bookingRoutes(req, res, next)
})
app.use('/api/admin/stories', (req, res, next) => {
  req.url = '/admin' + (req.url === '/' ? '/all' : req.url)
  storyRoutes(req, res, next)
})
app.use('/api/admin/treatments', (req, res, next) => {
  req.url = '/admin'
  treatmentRoutes(req, res, next)
})

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`\n✅ ONS Healthcare API running on http://localhost:${PORT}`)
  console.log(`   Health: http://localhost:${PORT}/health`)
  console.log(`   Treatments: http://localhost:${PORT}/api/treatments`)
  console.log(`   Machines:   http://localhost:${PORT}/api/machines`)
  console.log(`   Stories:    http://localhost:${PORT}/api/stories\n`)
})
