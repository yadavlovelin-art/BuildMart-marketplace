import express from 'express'
import { createOrder, getOrders, trackOrder, updateOrder } from '../controllers/orderController.js'
import { authorizeRoles, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/track/:trackingId', trackOrder)
router.post('/', protect, authorizeRoles('admin'), createOrder)
router.get('/', protect, authorizeRoles('admin'), getOrders)
router.put('/:id', protect, authorizeRoles('admin'), updateOrder)

export default router
