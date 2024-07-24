import { Schema, Document, model } from 'mongoose'




interface ISeller extends Document {
    gstNumber: string
    busisnessName: string
    _user: Schema.Types.ObjectId
}

const sellerSchema: Schema = new Schema({
    gstNumber: {
        type: String,
        required: true,
    },
    businessName: {
        type: String,
        required: true
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    versionKey: false
}) 


export const Seller = model<ISeller>('Seller', sellerSchema)