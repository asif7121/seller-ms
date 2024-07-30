import { Bundle } from '@models/bundle'
import { Request, Response } from 'express'

export const getAllBundle = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user
		const { page = 1, limit = 10, search } = req.query
		const pageNumber = parseInt(page as string)
		const limitNumber = parseInt(limit as string)
		const searchFilter = search
			? { _seller: _id['_id'], name: { $regex: search, $options: 'i' } }
			: { _seller: _id['_id'] }
		const bundle = await Bundle.find(searchFilter)
			.sort({ name: 1 })
			.skip((pageNumber - 1) * limitNumber)
			.limit(limitNumber)

		const totalCounts = await Bundle.countDocuments(searchFilter)
		return res.status(200).json({
			success: true,
			page: pageNumber,
			itemsPerPage: limitNumber,
			totalItems: totalCounts,
			totalPages: Math.ceil(totalCounts / limitNumber),
			data: bundle,
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}
