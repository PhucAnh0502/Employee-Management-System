import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave} from '../controllers/leaveController.js'

const router = express.Router()

router.get('/', authMiddleware, getLeaves)
router.post('/add', authMiddleware, addLeave)
router.get('/:id', authMiddleware, getLeave)
router.put('/:id', authMiddleware, updateLeave)
router.get('/detail/:id', authMiddleware, getLeaveDetail)

export default router