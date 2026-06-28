const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { readData, writeData } = require('../db')
const { adminMiddleware } = require('../middleware/auth')

const router = express.Router()

// GET /api/treatments
router.get('/', (req, res) => {
  const treatments = readData('treatments.json')
  const { specialty, search } = req.query

  let result = treatments
  if (specialty) result = result.filter((t) => t.specialty === specialty)
  if (search) result = result.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))

  res.json(result)
})

// GET /api/treatments/:id
router.get('/:id', (req, res) => {
  const treatments = readData('treatments.json')
  const treatment = treatments.find((t) => t.id === req.params.id)
  if (!treatment) return res.status(404).json({ message: 'Treatment not found' })
  res.json(treatment)
})

// POST /api/admin/treatments  (admin only)
router.post('/admin', adminMiddleware, (req, res) => {
  const treatments = readData('treatments.json')
  const newTreatment = { id: uuidv4(), ...req.body, created_at: new Date().toISOString() }
  treatments.push(newTreatment)
  writeData('treatments.json', treatments)
  res.status(201).json(newTreatment)
})

// PUT /api/treatments/:id  (admin only)
router.put('/:id', adminMiddleware, (req, res) => {
  const treatments = readData('treatments.json')
  const idx = treatments.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ message: 'Treatment not found' })
  treatments[idx] = { ...treatments[idx], ...req.body }
  writeData('treatments.json', treatments)
  res.json(treatments[idx])
})

// DELETE /api/treatments/:id  (admin only)
router.delete('/:id', adminMiddleware, (req, res) => {
  let treatments = readData('treatments.json')
  treatments = treatments.filter((t) => t.id !== req.params.id)
  writeData('treatments.json', treatments)
  res.json({ message: 'Treatment deleted' })
})

module.exports = router
