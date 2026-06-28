const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { readData, writeData } = require('../db')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')

const router = express.Router()

// POST /api/bookings  — create booking
router.post('/', authMiddleware, (req, res) => {
  const { treatmentId, date, time, notes } = req.body
  if (!treatmentId || !date || !time) {
    return res.status(400).json({ message: 'treatmentId, date and time are required' })
  }

  const treatments = readData('treatments.json')
  const treatment = treatments.find((t) => t.id === treatmentId)
  if (!treatment) return res.status(404).json({ message: 'Treatment not found' })

  const bookings = readData('bookings.json')
  const newBooking = {
    id: uuidv4(),
    patientId: req.user.id,
    treatmentId,
    treatment_name: treatment.name,
    appointment_date: date,
    appointment_time: time,
    notes: notes || '',
    status: 'pending',
    created_at: new Date().toISOString(),
  }
  bookings.push(newBooking)
  writeData('bookings.json', bookings)
  res.status(201).json(newBooking)
})

// GET /api/bookings/patient  — patient's own bookings
router.get('/patient', authMiddleware, (req, res) => {
  const bookings = readData('bookings.json')
  const result = bookings.filter((b) => b.patientId === req.user.id)
  res.json(result)
})

// GET /api/bookings/:id  — get single booking
router.get('/:id', authMiddleware, (req, res) => {
  const bookings = readData('bookings.json')
  const booking = bookings.find((b) => b.id === req.params.id)
  if (!booking) return res.status(404).json({ message: 'Booking not found' })
  if (booking.patientId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' })
  }
  res.json(booking)
})

// DELETE /api/bookings/:id  — cancel booking
router.delete('/:id', authMiddleware, (req, res) => {
  const bookings = readData('bookings.json')
  const idx = bookings.findIndex((b) => b.id === req.params.id)
  if (idx === -1) return res.status(404).json({ message: 'Booking not found' })
  if (bookings[idx].patientId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' })
  }
  bookings[idx].status = 'cancelled'
  writeData('bookings.json', bookings)
  res.json({ message: 'Booking cancelled' })
})

// GET /api/admin/bookings  — admin: all bookings
router.get('/admin/all', adminMiddleware, (req, res) => {
  const bookings = readData('bookings.json')
  const users = readData('users.json')
  const result = bookings.map((b) => {
    const user = users.find((u) => u.id === b.patientId)
    return {
      ...b,
      patient_name: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
    }
  })
  res.json(result)
})

// PATCH /api/admin/bookings/:id  — admin: update status
router.patch('/admin/:id', adminMiddleware, (req, res) => {
  const bookings = readData('bookings.json')
  const idx = bookings.findIndex((b) => b.id === req.params.id)
  if (idx === -1) return res.status(404).json({ message: 'Booking not found' })
  bookings[idx] = { ...bookings[idx], ...req.body }
  writeData('bookings.json', bookings)
  res.json(bookings[idx])
})

module.exports = router
