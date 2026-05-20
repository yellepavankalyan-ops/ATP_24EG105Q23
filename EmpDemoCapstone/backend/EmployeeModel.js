import { Schema,model } from 'mongoose';
//create a emp schema 
const empSchema=new Schema({
    name:{
        type:String,
        required:[true,"username is required"],
        minLength:[4,"min length of user name is 4 chars"],
         maxLength:[6,"max length of user name is 6 chars"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already existed"],
    },
    mobile:{
        type:Number,
        required:[true],
        minLength:[10,"correct mobile number"],
    },
    designation:{
      type:String,
      required:[true],
    },
    companyName:{
        type:String,
        required:[true],
    },
 
},
{    
    versionKey:false,
    timestamps:true,
},
);
//Generate emp model
export const EmployeeModel=model("emp",empSchema);