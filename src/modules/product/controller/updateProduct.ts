import { Product } from "@models/product";
import { Request, Response } from "express";





export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user
        const { name, price, productId } = req.body
        const product = await Product.findOne({ _id: productId, _seller: _id })
        if (!product) {
            return res.status(400).json({error: 'No product available..'})
        }
        if(product.name !== undefined) product.name = name
        if (product.price !== undefined) product.price = price
        await product.save()
        return res.status(200).json({message:'Updated successfully.', data: product})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}