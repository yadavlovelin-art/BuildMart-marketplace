import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'buildmart-dev-secret', { expiresIn: '7d' })

export const registerUser = async (req, res) => {
  const { name, email, password, setupKey } = req.body

  if (setupKey !== process.env.ADMIN_SETUP_KEY) {
    return res.status(403).json({ message: 'Admin setup key is invalid' })
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'Admin already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashedPassword, role: 'admin' })

  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  })
}
