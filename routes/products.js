import express from 'express'
import { create, edit, deletee, getProducts, getImage, getOneProduct } from '../controllers/products.js'

const router = express.Router()

router.post('/', create)
router.patch('/:id', edit)
router.delete('/:id', deletee)
router.get('/', getProducts)
router.get('/:id', getOneProduct)
router.get('/images/:file', getImage)
// router.get('/user/:user', user)
// router.get('/file/:file', file)

export default router
