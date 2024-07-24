import { Router } from "express";
import { addProduct, getProduct, updateProduct } from "@modules/product/controller";




const router = Router()

router.post('/add', addProduct)
router.get('/get-detail', getProduct)
router.patch('/update', updateProduct)


export const  productRoute = router