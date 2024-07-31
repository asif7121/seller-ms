import { Router } from "express";
import { createSellerInfo } from "@modules/sellerInfo/controller";





const router = Router()

router.post('/add-seller-info', createSellerInfo)



export const sellerInfoRouter = router