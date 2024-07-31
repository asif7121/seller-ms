import { SellerInfo } from '@models/sellerInfo'
import { Request, Response } from 'express'

export const createSellerInfo = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user
		const {
			shopName,
			shopDescription,
			shopContactNumber,
			businessLicense,
			taxId,
			website,
			gstNumber,
		} = req.body
		const sellerBusinessInfo = new SellerInfo({
			_seller: _id,
			shopName,
			shopDescription,
			shopContactNumber,
			businessLicense,
			taxId,
			website,
			gstNumber,
		})

		await sellerBusinessInfo.save()
		return res.status(201).json({ success: true, data: sellerBusinessInfo })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}
