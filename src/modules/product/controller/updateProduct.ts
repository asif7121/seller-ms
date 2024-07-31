import { Product } from "@models/product";
import { Request, Response } from "express";





export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { _id} = req.user
        const {productId} = req.query
        const { name, mrp,discount, description } = req.body
        const product = await Product.findOne({ _id: productId, _createdBy: _id })
        if (!product) {
            return res.status(400).json({error: 'No product available..'})
        }
        let finalPrice: number = mrp
        if(product.name !== undefined) product.name = name
        if(product.discount !== undefined) product.discount = discount
        if (product.mrp !== undefined) product.price = mrp
        if (product.description !== undefined) product.description = description
        if (discount) {
            finalPrice = mrp - (mrp * discount) / 100
            product.price = finalPrice
        }
        await product.save()
        return res.status(200).json({message:'Updated successfully.', data: product})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}