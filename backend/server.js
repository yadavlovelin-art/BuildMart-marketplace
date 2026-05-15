import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// ── CORS: allow ALL origins (fixes "signal aborted" + CORS errors) ──────────
app.use(
  cors({
    origin: true,        // accept every origin — safest fix for Render free plan
    credentials: true,
  }),
)

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// Health check — Uptime Robot / wake-up ping hits this
app.get('/', (_req, res) => res.json({ message: 'BuildMart API running' }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server listening on port ${port}`)
      console.log(`   NODE_ENV  : ${process.env.NODE_ENV || 'development'}`)
      console.log(`   CLIENT_URL: ${process.env.CLIENT_URL || 'ALL'}`)
    })
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message)
    process.exit(1)
  })
