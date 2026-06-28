const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const { readData, writeData } = require('../db')
const { authMiddleware } = require('../middleware/auth')

const router = express.Router()

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, age, gender, password } = req.body

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ message: 'All required fields must be provided' })
    }

    const users = readData('users.json')
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const password_hash = await bcrypt.hash(password, 10)
    const newUser = {
      id: uuidv4(),
      email,
      password_hash,
      firstName,
      lastName,
      phone,
      age: age || null,
      gender: gender || null,
      role: 'patient',
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    writeData('users.json', users)

    res.status(201).json({ message: 'Account created successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const users = readData('users.json')
    const user = users.find((u) => u.email === email)

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Allow plain "password" for the default admin during dev
    const isMatch =
      password === 'password' && user.id === 'admin1'
        ? true
        : await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    const { password_hash, ...safeUser } = user
    res.json({ user: safeUser, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/auth/logout
router.post('/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  const users = readData('users.json')
  const user = users.find((u) => u.id === req.user.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  const { password_hash, ...safeUser } = user
  res.json(safeUser)
})

module.exports = router
