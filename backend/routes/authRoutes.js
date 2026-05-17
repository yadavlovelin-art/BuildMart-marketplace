import express from 'express'
import { loginUser, registerUser, clientRegister, clientLogin, googleClientAuth } from '../controllers/authController.js'

const router = express.Router()

// Admin routes
router.post('/register', registerUser)
router.post('/login', loginUser)

// Client routes
router.post('/client-register', clientRegister)
router.post('/client-login', clientLogin)
router.post('/google-client', googleClientAuth)

export default router
