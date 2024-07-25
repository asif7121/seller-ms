import { Router } from "express";
import { addProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "@modules/product/controller";




const router = Router()

router.post('/add', addProduct)
router.get('/get-detail', getProduct)
router.patch('/update', updateProduct)
router.delete('/delete', deleteProduct)
router.get('/all-products', getAllProduct)


export const  productRoute = router