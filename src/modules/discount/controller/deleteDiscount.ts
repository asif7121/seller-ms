import { Discount } from "@models/discount";
import { Request, Response } from "express";




export const deleteDiscount = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user
        const { discountId } = req.query
        const discount = await Discount.findOneAndDelete({ _id: discountId, _seller: _id })
        if (!discount) {
            return res.status(400).json({error: 'no discount data found with provided discount id..'})
        }
        return res
			.status(200)
			.json({ message: 'Discount deleted successfully', deletedItem: discount })

    } catch (error) {
        console.log(error)
		return res.status(500).json({ error: error.message })
    }
}