import { Bundle } from "@models/bundle"
import { Request, Response } from "express"




export const getBundle = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user
		const { bundleId } = req.query
		const bundle = await Bundle.findOne({ _id: bundleId, _seller: _id['_id'] })
		if (!bundle) {
			return res.status(400).json({ error: 'Invalid bundle id' })
		}
		return res.status(200).json({ success: true, data: bundle })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}