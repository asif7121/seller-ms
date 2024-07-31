import { Document, model, Schema } from 'mongoose'

interface IBundle extends Document {
	name: string
	price: number
	discount?: number
	isDeleted:boolean
	_products: Schema.Types.ObjectId[]
	_createdBy: Schema.Types.ObjectId
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
		discount: {
			type: Number,
			default: undefined
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},

		_createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true, versionKey: false }
)

export const Bundle = model<IBundle>('Bundle', bundleSchema)
