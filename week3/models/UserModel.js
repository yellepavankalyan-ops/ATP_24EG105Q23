import { Schema,model } from "mongoose";
//Create User Schema
const userSchema =new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        minLength: [4,"Min length of 4 chars is required"],
        maxLength: [6,"Max length of 6 chars"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exits"]
    },
    age:{
        type:Number,
    },
 },
    {
        versionKey:false,
        timestamps: true,
    },
)

//Generate UserModel
export const UserModel= model("user",userSchema)