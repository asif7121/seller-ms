import { Product } from '@models/product'
import { Request, Response } from 'express'
import mongoose from 'mongoose'

export const getAllProduct = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user
		const { page = 1, limit = 10, search } = req.query
		const pageNumber = parseInt(page as string)
		const limitNumber = parseInt(limit as string)

		const searchFilter = search
			? {
				$or: [
					{ name: { $regex: search, $options: 'i' } },
					{ 'category.name': { $regex: search, $options: 'i' } },
				]
			} : {};

		const products = await Product.aggregate([
			{
				$match: { _createdBy: _id },
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
				$match: searchFilter,
			},
			{
				$facet: {
					metadata: [{ $count: 'total' }],
					data: [
						{ $sort: { name: 1 } },
						{ $skip: (pageNumber - 1) * limitNumber },
						{ $limit: limitNumber },
						{
							$project: {
								_id: 1,
								name: 1,
								price: 1,
								mrp: 1,
								description: 1,
								stockAvailable: 1,
								isActive: 1,
								category: '$category.name',
							},
						},
					],
				},
			},
		])

		const totalItems = products[0].metadata[0] ? products[0].metadata[0].total : 0
		const paginatedData = products[0].data

		return res.status(200).json({
			success: true,
			page: pageNumber,
			itemsPerPage: limitNumber,
			totalItems: totalItems,
			totalPages: Math.ceil(totalItems / limitNumber),
			data: paginatedData,
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}
