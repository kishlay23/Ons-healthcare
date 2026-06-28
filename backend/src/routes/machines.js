const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { readData, writeData } = require('../db')
const { adminMiddleware } = require('../middleware/auth')

const router = express.Router()

// GET /api/machines
router.get('/', (req, res) => {
  const machines = readData('machines.json')
  const { specialty } = req.query
  const result = specialty ? machines.filter((m) => m.specialty === specialty) : machines
  res.json(result)
})

// GET /api/machines/:id
router.get('/:id', (req, res) => {
  const machines = readData('machines.json')
  const machine = machines.find((m) => m.id === req.params.id)
  if (!machine) return res.status(404).json({ message: 'Machine not found' })
  res.json(machine)
})

// POST /api/machines  (admin only)
router.post('/', adminMiddleware, (req, res) => {
  const machines = readData('machines.json')
  const newMachine = { id: uuidv4(), ...req.body, acquired_date: new Date().toISOString().split('T')[0] }
  machines.push(newMachine)
  writeData('machines.json', machines)
  res.status(201).json(newMachine)
})

// PUT /api/machines/:id  (admin only)
router.put('/:id', adminMiddleware, (req, res) => {
  const machines = readData('machines.json')
  const idx = machines.findIndex((m) => m.id === req.params.id)
  if (idx === -1) return res.status(404).json({ message: 'Machine not found' })
  machines[idx] = { ...machines[idx], ...req.body }
  writeData('machines.json', machines)
  res.json(machines[idx])
})

module.exports = router
