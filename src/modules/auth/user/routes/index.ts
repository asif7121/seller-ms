import { Router } from "express";
import { details } from "@modules/auth/user/controller";
import { verify_token } from "@middlewares/verifyToken";






const router = Router()

router.post('/add-details', details)


export const user_router = router