
import { verify_token } from "@middlewares/verifyToken";
import { user_router } from "@modules/auth/user/routes";
import { bundleRouter } from "@modules/bundle/routes";
import { productRoute } from "@modules/product/routes";
import { Router } from "express";



const router = Router()

router.use(verify_token)
router.use('/seller',user_router)
router.use('/product', productRoute)
router.use('/bundle', bundleRouter)



export default router