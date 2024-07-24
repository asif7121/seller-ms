import { Seller } from "@models/seller";
import { Request, Response } from "express";





export const details = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user
        // console.log(`user: ${req.user._id}`)
        const { gstNumber, businessName } = req.body
        
			const data = await Seller.create({
				gstNumber,
				businessName,
				_user: _id,
			})
			// console.log('data',data)
			return res.status(201).json({ data: { item: data } })
		
        // return res.status(403).json({ error: 'Unauthorized access...' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}