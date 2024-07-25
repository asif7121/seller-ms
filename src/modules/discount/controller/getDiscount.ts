import { Discount } from "@models/discount";
import { Request, Response } from "express";





export const getDiscount = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user
        const { discountId } = req.query
        const discount = await Discount.findOne({ _id: discountId, _seller: _id })
        if (!discount) {
            return res.status(400).json({error: 'Invalid discount id'})
        }
        return res.status(200).json({success:true, data:discount})
    } catch (error) {
        console.log(error)
		return res.status(500).json({ error: error.message })
    }
}