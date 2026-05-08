import { Schema,model } from "mongoose";
//Create User Schema
const EmpSchema =new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exits"]
    },
    mobile:{
        type:Number,
        required:[true,"Mobile no is required"],
    },
    designation:{
        type:String,
        required:[true,"Designation is required"],
    },
    company:{
        type:String,
        required:[true,"Company name is required"],
    }
 },
    {
        versionKey:false,
        timestamps: true,
    },
)

//Generate UserModel
export const EmpModel= model("Employees",EmpSchema)