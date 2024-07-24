import { Product } from "@models/product";
import { Seller } from "@models/seller";
import { Request, Response } from "express";




export const addProduct = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user
        console.log(`id: ${_id}`)
        const { name, price } = req.body
        
            const product = await Product.create({
                name,
                price,
                _seller: _id
            })
            return res.status(201).json({message: 'Product added..', data:{item:product}})
        
        // return res.status(403).json({error: 'Unauthorized access...'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}