import { Product } from '@models/product'
import { Request, Response } from 'express'

export const getAllProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = req.user
		const { page = 1, limit = 10, search } = req.query
		const pageNumber = parseInt(page as string)
		const limitNumber = parseInt(limit as string)
		const searchFilter = search
			? { _createdBy: userId, name: { $regex: search, $options: 'i' } }
			: { _createdBy: userId }
		const products = await Product.find(searchFilter)
			.sort({ name: 1 })
			.skip((pageNumber - 1) * limitNumber)
			.limit(limitNumber)

        const totalProducts = await Product.countDocuments(searchFilter)
        return res.status(200).json({
			success: true,
			page: pageNumber,
			itemsPerPage: limitNumber,
			totalItems: totalProducts,
			totalPages: Math.ceil(totalProducts / limitNumber),
			data: products,
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}
