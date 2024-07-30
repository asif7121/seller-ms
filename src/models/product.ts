import { Schema, Document, model } from "mongoose";


interface IProduct extends Document {
	name: string
	price: number
	mrp: number
	discount?: number
	stockAvailable: number
	description: string
	isActive: boolean
	_category: Schema.Types.ObjectId
	_createdBy: Schema.Types.ObjectId
}

const productSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		mrp: {
			type: Number,
			required: true,
		},
		discount: {
			type: Number,
			default: undefined,
		},
		stockAvailable: {
			type: Number,
			required: true,
			default: 0,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		_createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		_category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)



export const Product = model<IProduct>('Product', productSchema)