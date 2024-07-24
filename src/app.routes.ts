
import { verify_token } from "@middlewares/verifyToken";
import { user_router } from "@modules/auth/user/routes";
import { productRoute } from "@modules/product/routes";
import { Router } from "express";



const router = Router()

router.use(verify_token)
router.use('/seller',user_router)
router.use('/product',productRoute)



export default router