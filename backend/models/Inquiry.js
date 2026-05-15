import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    materialNeeded: { type: String, required: true, trim: true },
    quantity: { type: String, default: '', trim: true },
    deliveryLocation: { type: String, default: '', trim: true },
    message: { type: String, default: '', trim: true },
    status: { type: String, enum: ['new', 'contacted', 'converted', 'closed'], default: 'new' },
  },
  { timestamps: true },
)

export default mongoose.model('Inquiry', inquirySchema)
