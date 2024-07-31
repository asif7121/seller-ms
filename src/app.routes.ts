import { verify_token } from "@middlewares/verifyToken";
import { bundleRouter } from "@modules/bundle/routes";
import { productRoute } from "@modules/product/routes";
import { sellerInfoRouter } from "@modules/sellerInfo/routes";
import { Router } from "express";



const router = Router()

router.use(verify_token)
router.use('/seller',sellerInfoRouter)
router.use('/product', productRoute)
router.use('/bundle', bundleRouter)



export default router