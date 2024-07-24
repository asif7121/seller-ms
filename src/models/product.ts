import { Schema, Document, model } from "mongoose";


interface IProduct extends Document{
    name: string
    price: number
    _seller: Schema.Types.ObjectId
}

const productSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    _seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey:false
})



export const Product = model<IProduct>('Product', productSchema)