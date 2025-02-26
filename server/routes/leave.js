import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {addLeave, getLeave, getLeaves} from '../controllers/leaveController.js'

const router = express.Router()

router.get('/', authMiddleware, getLeaves)
router.post('/add', authMiddleware, addLeave)
router.get('/:id', authMiddleware, getLeave)

export default router