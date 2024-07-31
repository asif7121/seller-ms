import { Bundle } from '@models/bundle'
import { Request, Response } from 'express'

export const getAllBundle = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user
		const { page = 1, limit = 10, search } = req.query
		const pageNumber = parseInt(page as string)
		const limitNumber = parseInt(limit as string)
		const searchFilter = search
			? { _createdBy: _id, name: { $regex: search, $options: 'i' } }
			: { _createdBy: _id }
		 const bundles = await Bundle.aggregate([
				{ $match: searchFilter },
				{ $sort: { name: 1 } }, // Sort the results by bundle name
				{
					$lookup: {
						from: 'products',
						localField: '_products',
						foreignField: '_id',
						as: 'products',
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						price: 1,
						discount: 1,
						_createdBy: 1,
						products: {
							$map: {
								input: '$products',
								as: 'product',
								in: {
									_id: '$$product._id',
									name: '$$product.name',
									price: '$$product.price',
								},
							},
						},
					},
				},
				{ $skip: (pageNumber - 1) * limitNumber },
				{ $limit: limitNumber },
			])

			const totalCounts = await Bundle.countDocuments(searchFilter)

			return res.status(200).json({
				success: true,
				page: pageNumber,
				itemsPerPage: limitNumber,
				totalItems: totalCounts,
				totalPages: Math.ceil(totalCounts / limitNumber),
				data: bundles,
			})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}
