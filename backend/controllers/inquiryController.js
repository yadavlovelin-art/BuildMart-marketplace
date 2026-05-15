import Inquiry from '../models/Inquiry.js'

export const createInquiry = async (req, res) => {
  try {
    const { customerName, phoneNumber, materialNeeded, quantity, deliveryLocation, message } = req.body
    if (!customerName || !phoneNumber || !materialNeeded) {
      return res.status(400).json({ message: 'Name, phone number, and material needed are required' })
    }

    const inquiry = await Inquiry.create({
      customerName,
      phoneNumber,
      materialNeeded,
      quantity,
      deliveryLocation,
      message,
    })

    return res.status(201).json(inquiry)
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to create inquiry' })
  }
}

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })
    return res.json(inquiries)
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to fetch inquiries' })
  }
}

// Admin "Convert to Order" — marks inquiry converted, returns pre-filled order data
export const convertInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' })

    inquiry.status = 'converted'
    await inquiry.save()

    return res.json({
      inquiry,
      orderData: {
        customerName: inquiry.customerName,
        phoneNumber: inquiry.phoneNumber,
        products: inquiry.materialNeeded,
        quantity: inquiry.quantity || '',
        deliveryAddress: inquiry.deliveryLocation || '',
      },
    })
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to convert inquiry' })
  }
}
