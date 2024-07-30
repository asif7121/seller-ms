import { Seller } from "@models/seller"





export const createSeller = async (data: { userId: string, email: string })=>{
    const user = new Seller(data)
    await user.save()
    return user
}