import mongoose from 'mongoose'

const productLineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, default: 1, min: 1 },
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    products: { type: [productLineSchema], default: [] },
    quantity: { type: Number, default: 1 },
    deliveryAddress: { type: String, required: true, trim: true },
    trackingId: { type: String, required: true, unique: true, trim: true },
    orderStatus: {
      type: String,
      enum: [
        'Order Received',
        'Material Processing',
        'Material Loaded',
        'Vehicle Dispatched',
        'Reached Delivery Area',
        'Delivered Successfully',
      ],
      default: 'Order Received',
    },
  },
  { timestamps: true },
)

export default mongoose.model('Order', orderSchema)
