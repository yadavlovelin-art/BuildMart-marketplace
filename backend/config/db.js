import mongoose from 'mongoose'

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in environment variables')
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })

  console.log('✅ MongoDB connected to Atlas')

  mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB disconnected'))
  mongoose.connection.on('reconnected', () => console.log('✅ MongoDB reconnected'))
}
