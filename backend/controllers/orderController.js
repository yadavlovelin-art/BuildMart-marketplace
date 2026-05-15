import Order from '../models/Order.js'

const steps = [
  'Order Received',
  'Material Processing',
  'Material Loaded',
  'Vehicle Dispatched',
  'Reached Delivery Area',
  'Delivered Successfully',
]

const makeTrackingId = () => `BM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`

export const createOrder = async (req, res) => {
  const { customerName, phoneNumber, products = [], quantity = 1, deliveryAddress, trackingId, orderStatus } = req.body
  if (!customerName || !phoneNumber || !deliveryAddress) {
    return res.status(400).json({ message: 'Customer name, phone number, and delivery address are required' })
  }

  const order = await Order.create({
    customerName,
    phoneNumber,
    products,
    quantity,
    deliveryAddress,
    trackingId: trackingId || makeTrackingId(),
    orderStatus: orderStatus || 'Order Received',
  })

  return res.status(201).json(order)
}

export const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 })
  return res.json(orders)
}

export const updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order) return res.status(404).json({ message: 'Order not found' })

  ;['customerName', 'phoneNumber', 'products', 'quantity', 'deliveryAddress', 'trackingId', 'orderStatus'].forEach((field) => {
    if (req.body[field] !== undefined) order[field] = req.body[field]
  })

  await order.save()
  return res.json(order)
}

export const trackOrder = async (req, res) => {
  const order = await Order.findOne({ trackingId: req.params.trackingId })
  if (!order) return res.status(404).json({ message: 'Tracking ID not found' })
  const progress = Math.max(0, steps.indexOf(order.orderStatus))
  return res.json({ ...order.toObject(), progress, steps })
}
