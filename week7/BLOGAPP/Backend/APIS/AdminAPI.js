import exp from 'express'
import { UserModel } from "../models/UserModel.js"
import { verifyToken } from '../middlewares/verifyToken.js'
import {hash} from "bcryptjs" 

export const adminApp=exp.Router()

//Read all users and authors by email
adminApp.get("/users",verifyToken("ADMIN"),async(req,res)=>
{
    //get email of users
        const {email} =req.query;
        //find email of user or authors
        const users=await UserModel.find({email:{$regex:email,$options:"i"},role:{$in:["USER","AUTHOR"]}})
        //send response
        res.status(200).json({message:"users",payload:users})
})    
// Block or Activate user/author
adminApp.patch("/users", verifyToken("ADMIN"), async (req, res, next) => {
    //get body from the users 
    const { userId, isUserActive } = req.body;
//fing user by id 
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.isUserActive = isUserActive;

    await user.save();

    res.status(200).json({
      message: "User status updated",
      payload: user
    });
});


// Change password by admin
adminApp.put("/password", verifyToken("ADMIN"), async (req, res, next) => {
 

    const { userId, newPassword } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const hashedPassword = await hash(newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully"
    });

})