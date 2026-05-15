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

// CORS - only allow our frontend
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
  : ['http://localhost:3000']

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error(`CORS: origin ${origin} not allowed`))
    },
    credentials: true,
  }),
)

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

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
      console.log(`   CLIENT_URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`)
    })
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message)
    process.exit(1)
  })
