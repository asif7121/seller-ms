import { Schema, Document, model } from 'mongoose'




interface ISeller extends Document {
   email: string
    userId: Schema.Types.ObjectId
}

const sellerSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
    }
}, {
    timestamps: true,
    versionKey: false
}) 


export const Seller = model<ISeller>('Seller', sellerSchema)