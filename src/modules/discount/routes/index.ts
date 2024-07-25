import { Router } from "express";
import { addDiscount, deleteDiscount, getAllDiscount, getDiscount, updateDiscount } from "@modules/discount/controller";




const router = Router()

router.post('/add-discount', addDiscount)
router.get('/get-discount', getDiscount)
router.get('/get-all', getAllDiscount)
router.patch('/update', updateDiscount)
router.delete('/delete', deleteDiscount)




export const discountRouter = router