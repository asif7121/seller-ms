import { verify_token } from "@middlewares/verifyToken";
import { bundleRouter } from "@modules/bundle/routes";
import { productRouter } from "@modules/product/routes";
import { saleRouter } from "@modules/sale/routes";
import { sellerInfoRouter } from "@modules/sellerInfo/routes";
import { Router } from "express";



const router = Router()

router.use(verify_token)
router.use('/seller',sellerInfoRouter)
router.use('/product', productRouter)
router.use('/bundle', bundleRouter)
router.use('/sale', saleRouter)



export default router