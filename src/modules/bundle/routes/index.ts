import { Router } from "express";
import { addBundle, getAllBundle, getBundle, updateBundle } from "@modules/bundle/controller";






const router = Router()

router.post('/add-bundle', addBundle)
router.get('/get-bundle', getBundle)
router.get('/get-all', getAllBundle)
router.patch('/update', updateBundle)


export const bundleRouter = router