import { Product } from '@models/product'
import { Request, Response } from 'express'
import mongoose, { isValidObjectId } from 'mongoose'

export const getProduct = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user
		const { productId }: any = req.query
		if (!isValidObjectId(productId)) {
			return res.status(400).json({ error: 'Invalid Product ID' })
		}

		const product = await Product.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(productId),
					'_createdBy._id': _id,
					isDeleted: false, // Ensure the product is not deleted
				},
			},
			{
				$lookup: {
					from: 'categories',
					localField: '_category',
					foreignField: '_id',
					as: 'category',
				},
			},
			{ $unwind: '$category' },
			{
				$project: {
					_id: 1,
					name: 1,
					price: 1,
					mrp: 1,
					discount:1,
					description: 1,
					stockAvailable: 1,
					category: '$category.name',
				},
			},
		])

		if (!product.length) {
			return res.status(404).json({ error: 'Product not found or has been deleted' })
		}

		return res.status(200).json({ success: true, data: product[0] })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}
