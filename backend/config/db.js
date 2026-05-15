import mongoose from 'mongoose'

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in environment variables')
  }

  // Auto-retry logic — if Atlas is slow to respond, try 3 times
  let attempts = 0
  while (attempts < 3) {
    try {
      attempts++
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 15000,  // 15 sec per attempt
        socketTimeoutMS: 60000,           // 60 sec socket timeout
        connectTimeoutMS: 15000,
        maxPoolSize: 5,                   // limit connections on free tier
      })
      console.log(`✅ MongoDB connected to Atlas (attempt ${attempts})`)
      break
    } catch (err) {
      console.error(`❌ MongoDB attempt ${attempts} failed: ${err.message}`)
      if (attempts >= 3) throw err
      console.log(`⏳ Retrying in 3 seconds...`)
      await new Promise((r) => setTimeout(r, 3000))
    }
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected — will auto-reconnect')
  })
  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected')
  })
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err.message)
  })
}
