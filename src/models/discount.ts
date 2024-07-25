import { model, Schema, Document } from "mongoose";




interface IDiscount extends Document {
	_product: Schema.Types.ObjectId
    _seller: Schema.Types.ObjectId
    discountType: string
    discountValue: number
    startDate: Date
    endDate: Date
}

const discountSchema: Schema = new Schema(
	{
		_product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
		},
		_seller: {
			type: Schema.Types.ObjectId,
			ref: 'User',
        },
        discountType: {
            type: String,
            required:true
        },
        discountValue: {
            type: Number,
            required:true
        },
        startDate: {
            type: Date,
            default: Date.now()
        },
        endDate: {
            type: Date,
            required:true
        }
	},
	{ timestamps: true, versionKey: false }
) 


export const Discount = model<IDiscount>('Discount', discountSchema)