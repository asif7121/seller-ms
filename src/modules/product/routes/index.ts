import { Router } from "express";
import { addProduct, deleteProduct, getAllCategory, getAllProduct, getCategory, getProduct, updateProduct } from "@modules/product/controller";




const router = Router()

router.post('/add', addProduct)
router.get('/get-detail', getProduct)
router.patch('/update', updateProduct)
router.patch('/delete', deleteProduct)
router.get('/all-products', getAllProduct)
router.get('/category', getCategory)
router.get('/all-category', getAllCategory)


export const  productRouter = router