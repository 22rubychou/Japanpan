import express from 'express'
import { create, edit, deletee, getOrder, getAllOrder } from '../controllers/orders.js'

const router = express.Router()

router.post('/', create)
router.patch('/:id', edit)
router.delete('/:id', deletee)
router.get('/:userId', getOrder)
router.get('/', getAllOrder)

export default router
