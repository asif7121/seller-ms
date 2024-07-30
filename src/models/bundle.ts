import { Document, model, Schema } from 'mongoose'

interface IBundle extends Document {
	name: string
	price: number
	_products: [Schema.Types.ObjectId]
	_discounts?: [Schema.Types.ObjectId]
	_seller: Schema.Types.ObjectId
}

const bundleSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		_products: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
		_discounts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Discount',
			},
		],
		_seller: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true, versionKey: false }
)

export const Bundle = model<IBundle>('Bundle', bundleSchema)
