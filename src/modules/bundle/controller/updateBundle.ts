import { Bundle } from '@models/bundle'
import { Request, Response } from 'express'

export const updateBundle = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user
		const { bundleId } = req.query
		const { name, price, productsId, discountsId } = req.body

		const bundle = await Bundle.findOne({ _id: bundleId, _seller: _id['_id'] })
		if (!bundle) {
			return res.status(400).json({ error: 'Invalid bundle id' })
		}
		// Update only the provided fields
		if (name !== undefined) bundle.name = name
		if (price !== undefined) bundle.price = price
		if (productsId !== undefined) bundle._products.push(productsId)
		if (discountsId !== undefined) bundle._discounts.push(discountsId)

		return res.status(200).json({ success: true, data: bundle })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}
