import { Product } from '@models/product'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = req.user
		const { productId } = req.query
		if (!isValidObjectId(productId)) {
			return res.status(400).json({ error: 'Invalid Product Id.' })
		}
		const product = await Product.findOne({ _id: productId, _createdBy: userId })
		if (!product) {
			return res.status(404).json({ error: 'Product not found..' })
		}
		product.isActive = false
		await product.save()
		return res
			.status(200)
			.json({ message: 'Product deleted successfully', deletedItem: product })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}
