import express from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js'
import { authorizeRoles, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', protect, authorizeRoles('admin'), createProduct)
router.put('/:id', protect, authorizeRoles('admin'), updateProduct)
router.delete('/:id', protect, authorizeRoles('admin'), deleteProduct)

export default router
