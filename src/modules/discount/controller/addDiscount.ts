import { Discount } from '@models/discount'
import { Product } from '@models/product'
import { Request, Response } from 'express'

export const addDiscount = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user
        const { productId } = req.query
        const { discountType, discountValue, startDate, endDate } = req.body
        const product = await Product.findOne({ _id: productId, _seller: _id })
        if (!product) {
            return res.status(400).json({error: 'Invalid product id'})
        }
        const discount = await Discount.create({
            _product: product._id,
            _seller: _id,
            discountType,
            discountValue,
            startDate,
            endDate,
        })
        return res.status(201).json({message:'Discount added successfully', data:discount})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}
