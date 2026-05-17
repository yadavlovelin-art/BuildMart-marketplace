import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'buildmart-dev-secret', { expiresIn: '7d' })

// ── Admin Register ─────────────────────────────────────────────────────────
export const registerUser = async (req, res) => {
  const { name, email, phone, password, setupKey } = req.body

  if (setupKey !== process.env.ADMIN_SETUP_KEY) {
    return res.status(403).json({ message: 'Admin setup key is invalid' })
  }

  if (!name || (!email && !phone) || !password) {
    return res.status(400).json({ message: 'Name, email ya phone, aur password zaroori hai' })
  }

  const query = []
  if (email) query.push({ email })
  if (phone) query.push({ phone })
  const existingUser = await User.findOne({ $or: query })
  if (existingUser) {
    return res.status(400).json({ message: 'Admin already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, phone, password: hashedPassword, role: 'admin' })

  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id),
  })
}

// ── Admin Login ────────────────────────────────────────────────────────────
export const loginUser = async (req, res) => {
  const { email, phone, password } = req.body

  if (!password || (!email && !phone)) {
    return res.status(400).json({ message: 'Email ya phone, aur password zaroori hai' })
  }

  let user = null
  if (email) user = await User.findOne({ email, role: 'admin' })
  else if (phone) user = await User.findOne({ phone, role: 'admin' })

  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' })

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id),
  })
}

// ── Client Register (Email/Phone + Password) ───────────────────────────────
export const clientRegister = async (req, res) => {
  const { name, email, phone, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Naam, email aur password zaroori hai' })
  }

  const existing = await User.findOne({ email })
  if (existing) {
    return res.status(400).json({ message: 'Is email se pehle se account hai. Login karo.' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, phone, password: hashedPassword, role: 'client' })

  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id),
  })
}

// ── Client Login (Email ya Phone + Password) ───────────────────────────────
export const clientLogin = async (req, res) => {
  const { email, phone, password } = req.body

  if (!password || (!email && !phone)) {
    return res.status(400).json({ message: 'Email ya phone, aur password zaroori hai' })
  }

  let user = null
  if (email) user = await User.findOne({ email, role: 'client' })
  else if (phone) user = await User.findOne({ phone, role: 'client' })

  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' })

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id),
  })
}

// ── Google OAuth Client Login/Register ────────────────────────────────────
export const googleClientAuth = async (req, res) => {
  const { name, email, googleId, avatar } = req.body

  if (!email || !googleId) {
    return res.status(400).json({ message: 'Google data incomplete' })
  }

  // Pehle se account hai? Update karo. Nahi hai? Banao.
  let user = await User.findOne({ $or: [{ googleId }, { email }] })

  if (user) {
    // Existing user — googleId update karo agar nahi tha
    if (!user.googleId) {
      user.googleId = googleId
      user.avatar = avatar
      await user.save()
    }
  } else {
    // Naya client user banao
    user = await User.create({ name, email, googleId, avatar, role: 'client' })
  }

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  })
}

