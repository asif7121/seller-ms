import { Router } from "express";
import { addProductToSale, getAllSales, getSaleDetails, getSaleProducts, removeProductFromSale } from "@modules/sale/controller";





const router = Router()


router.get('/get-sale', getSaleDetails)
router.get('/get-all', getAllSales)
router.get('/get-sale-products', getSaleProducts)
router.patch('/add-products', addProductToSale)
router.patch('/remove-product', removeProductFromSale)



export const saleRouter = router