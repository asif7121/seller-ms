import { Product } from "@models/product";
import { Request, Response } from "express";




export const getProduct = async (req: Request, res: Response) => {
    try {
        const {_id} = req.user
        const { productId } = req.query
        const product = await Product.findOne({ _id: productId, _seller: _id })
        if (!product) {
            return res.status(404).json({error: 'No Product found..'})
        }
        return res.status(200).json({success: true, data:product})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}