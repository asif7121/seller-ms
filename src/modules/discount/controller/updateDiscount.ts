import { Discount } from "@models/discount";
import { Request, Response } from "express";





export const updateDiscount = async (req: Request, res: Response) => {
    try {
		const { _id } = req.user
		const { discountId } = req.query
		const { discountType, discountValue, startDate, endDate } = req.body
		const discount = await Discount.findOne({ _id: discountId, _seller: _id })
		if (!discount) {
			return res.status(400).json({ error: 'Invalid discount id' })
		}
		// Update only the provided fields
		if (discountType !== undefined) discount.discountType = discountType
		if (discountValue !== undefined) discount.discountValue = discountValue
		if (startDate !== undefined) discount.startDate = startDate
		if (endDate !== undefined) discount.endDate = endDate

		// Save the updated discount
		await discount.save()
		return res.status(200).json({ message: 'Update successful..', data: discount })

		return res.status(400).json({ error: 'Please provide field to update.' })
	} catch (error) {
        console.log(error)
		return res.status(500).json({ error: error.message })
    }
}