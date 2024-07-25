import { Product } from "@models/product";
import { Request, Response } from "express";





export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {_id} = req.user
        const { productId } = req.query
        const product = await Product.findOneAndDelete({ _id: productId, _seller: _id })
        if (!product) {
            return res.status(404).json({error: 'Product not found..'})
        }
        return res.status(200).json({ message: 'Product deleted successfully', deletedItem:product })
    } catch (error) {
         console.log(error)
			return res.status(500).json({ error: error.message })
    }
}