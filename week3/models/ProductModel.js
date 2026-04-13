import { Schema,model } from "mongoose";
//Create User Schema
const productSchema =new Schema({
    productId:{
        type:String,
        required:[true,"ProductID is required"],
        unique:[true,"Id already exits"]
    },
    productName:{
        type:String,
        required:[true,"ProductName is required"],
    },
    price:{
        type:Number,
        required:[true,"Email is required"],
        minLength:[10000,"Minimum price is 10000"],
        maxLength:[50000,"Maximum price is 50000"]
    },
    brand:{
        type:String,
        required:[true,"Brand is required"]
    },
 },
    {
        versionKey:false,
        timestamps: true,
    },
)

//Generate UserModel
export const ProductModel= model("product",productSchema)