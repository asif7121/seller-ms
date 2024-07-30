import { Bundle } from "@models/bundle";
import { Request, Response } from "express";





export const addBundle = async (req: Request, res: Response) => {
    try {
        const { _id, role } = req.user
        const { name, price, productsId, discountsId } = req.body
        if (role['role'] !== 'seller') {
            return res.status(401).json({ error: 'Unauthorized access' })
        }
        const bundle = await Bundle.create({
            name,
            price,
            _products: productsId,
            _discounts: discountsId,
            _seller: _id['_id']
        })
        return res.status(201).json({success:true,data:bundle})
    } catch (error) {
        console.log(error)
		return res.status(500).json({ error: error.message })
    }
}