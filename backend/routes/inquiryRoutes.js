import express from 'express'
import { convertInquiry, createInquiry, getInquiries } from '../controllers/inquiryController.js'
import { authorizeRoles, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createInquiry)
router.get('/', protect, authorizeRoles('admin'), getInquiries)
router.patch('/:id/convert', protect, authorizeRoles('admin'), convertInquiry)

export default router
