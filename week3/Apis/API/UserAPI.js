//create min express app(Seperate Route)
import exp from 'express'
import { UserModel } from '../models/UserModel.js';
import { hash,compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/verifyToken.js';
const {sign}=jwt
export const userApp = exp.Router()

//Define USER REST API Routes

//user login 
userApp.post("/auth", async(req,res) => {
    //get cred obj from client
    const {email,password}=req.body
    //email authentication
    const user= await UserModel.findOne({email:email})
    //if email not exist
    if(user===null)
        return res.status(400).json({message:"Invalid Email"})
    //password verification
    const result= await compare(password,user.password)
    //if password not match
    if(result == false)
        return res.status(400).json({message:"Invalid password"})
    //if passwords are matched
    //create token (jsonwebtoken jwt -->jaat)
    const signedToken = sign({email:user.email},"abcdef",{expiresIn:"1h"})
    /*send token in res
    return res.status(200).json({message:"Login Success",token: signedToken})*/

    //store token as httpOnly cookie
    res.cookie("token",signedToken,{
        httpOnly:true,
        sameSite:"lax",
        secure:false  //secure:true is used for https protocols but no http protocaol. as we are in initial stages we use http protocol 
    })
    //send res
    res.status(200).json({message:"login Successful",payload: user})
})

//Create a new User
userApp.post("/users", async (req, res) => {
    //get new user obj from req
    const newUser = req.body;
    //hash the password
    const hashedPassword=await hash(newUser.password,10)
    //replace plain password with hashed password
    newUser.password=hashedPassword
    //create new user document
    const newuserDocument = new UserModel(newUser)
    //save
    const result = await newuserDocument.save()
    //console.log(result)
    //send res
    res.status(201).json({ message: "User Created" }) //201 status code shows successfull creation of user
}
)

//Read all users
userApp.get("/users",verifyToken, async (req, res) => {
    //read all users from db
    let usersList = await UserModel.find()
    //send res
    res.status(201).json({ message: "users", payload: usersList })
})

//Read a user by Object id
userApp.get("/user",verifyToken, async (req, res) => {
    const Useremail=req.user?.email
    console.log(Useremail)
    //Read object id from req params
    const uid = req.params.id
    //find user by id
    // const userObj= await UserModel.findOne({_id:uid})
    // const userObj=await UserModel.findById(uid)
    const userObj= await UserModel.findOne({email: Useremail})
    //if user not found
    if(!userObj)
        return res.status(404).json({message:"User not found"})
    //send res
    res.status(201).json({ message: "User", payload: userObj })
})

//Update a user by id
userApp.put("/users/:id", async (req, res) => {
    //get modified user from req
    const modifiedUser = req.body
    const uid = req.params.id
    //find user by id and update
    const updatedUser = await UserModel.findByIdAndUpdate(
        uid,
        { $set: { ...modifiedUser } },
        { new: true,runValidators:true })
    if(!updatedUser)
        return res.status(404).json({message:"User not found"})
    //send res
    res.status(201).json({ message: "User Modified", payload: updatedUser })
})

//Delete a user by Object id
userApp.delete("/users/:id",async(req,res)=> {
    const uid = req.params.id
    //find and delete a user by id
    let deletedUser=await UserModel.findByIdAndDelete(uid)
    if(!deletedUser)
        return res.status(404).json({message:"User not found"})
    //send res
    res.status(200).json({message:"Deleted User",payload:deletedUser})
})
