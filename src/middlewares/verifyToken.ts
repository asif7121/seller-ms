import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { Seller } from '@models/seller'
import { Schema } from 'mongoose'



// interface JwtPayload {
//     _id: Schema.Types.ObjectId
// }

export const verify_token = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers?.authorization?.split(' ')[1]
		if (!token) {
			return res.status(400).json({ error: 'Invalid token' })
		}
		const decode: any = jwt.verify(token, process.env.JWT_SECRET)
		const user = await Seller.findOne({ userId: decode?._id })
		req.user = user
		next()
	} catch (error) {
		console.log('something went wront while verifing the token', error)
		res.status(500).json({ error: error.message })
	}
}
