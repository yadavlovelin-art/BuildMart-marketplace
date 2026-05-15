import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    unit: { type: String, default: 'unit', trim: true },
    location: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export default mongoose.model('Product', productSchema)
