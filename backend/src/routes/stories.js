const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { readData, writeData } = require('../db')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')

const router = express.Router()

// GET /api/stories  (public — only published)
router.get('/', (req, res) => {
  const stories = readData('stories.json')
  const { specialty } = req.query
  let result = stories.filter((s) => s.status === 'published')
  if (specialty) result = result.filter((s) => s.specialty === specialty)
  res.json(result)
})

// GET /api/stories/:id
router.get('/:id', (req, res) => {
  const stories = readData('stories.json')
  const story = stories.find((s) => s.id === req.params.id && s.status === 'published')
  if (!story) return res.status(404).json({ message: 'Story not found' })
  res.json(story)
})

// POST /api/stories  (any user can submit — goes to pending)
router.post('/', (req, res) => {
  const stories = readData('stories.json')
  const newStory = {
    id: uuidv4(),
    ...req.body,
    status: 'pending',
    featured: false,
    created_at: new Date().toISOString().split('T')[0],
  }
  stories.push(newStory)
  writeData('stories.json', stories)
  res.status(201).json({ message: 'Story submitted for review', id: newStory.id })
})

// GET /api/admin/stories  (admin — all stories)
router.get('/admin/all', adminMiddleware, (req, res) => {
  const stories = readData('stories.json')
  res.json(stories)
})

// PATCH /api/admin/stories/:id  (admin — approve/reject)
router.patch('/admin/:id', adminMiddleware, (req, res) => {
  const stories = readData('stories.json')
  const idx = stories.findIndex((s) => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ message: 'Story not found' })
  stories[idx] = { ...stories[idx], ...req.body }
  writeData('stories.json', stories)
  res.json(stories[idx])
})

module.exports = router
