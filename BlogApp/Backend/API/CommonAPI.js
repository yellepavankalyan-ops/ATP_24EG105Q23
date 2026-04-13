/*import exp from 'express'
import {UserModel} from '../Models/UserModel.js'
import {hash,compare} from 'bcryptjs'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

const {sign}=jwt

export const commonApp= exp.Router()

config()

//Route for register
commonApp.post("/users",async(req,res)=>{
    let allowedRoles=["USER","AUTHOR"]
    //get user from req
    const newUser=req.body;
    //check newUser Role
    if(!allowedRoles.includes(newUser.role))
        return res.status(400).json({message:"Invalid Role"})
    //hash password and replace plain with hashed one
    newUser.password=await hash(newUser.password,12)
    //Create new user document
    const newUserDoc= new UserModel(newUser)
    //save document
    await newUserDoc.save()
    //send res
    res.status(201).json({message:"User Created"})
})


//Route for login(USER,AUTHOR,ADMIN)
commonApp.post("/login",async(req,res)=>{
    //get user cred obj
    const {email,password}=req.body
    //find user by email
    const user = await UserModel.findOne({email:email})
    //if user not found
    if(!user)
        return res.status(400).json({message:"Invalid email"})
    //compare password
    const isMatched= await compare(password,user.password)
    //if password not match
    if(!isMatched)
        return res.status(400).json({message:"Invaild password"})
    //create jwt
    const signedToken= sign({id:user._id,email:email,role: user.role},
        process.env.SECRET_KEY,
        {expiresIn:"1h"}
    )

    //set token to res header as httpOnly cookie
    res.cookie("token",signedToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
    })

    let userObj=user.toObject()
    delete userObj.password
    res.status(200).json({message:"Login Successful",payload:userObj})
})


//Route for logout
commonApp.get("/logout",(req,res)=>{       //as there is only one operation it is not a asynchronous route
    //delete token from cookie storage
    res.clearCookie("token", {
        httpOnly:true,
        secure:false,
        sameSite:"lax",
    })
    res.status(200).json({message:"Logout successful"})
})
*/

import exp from "express";
import { UserModel } from "../Models/UserModel.js";
import { hash, compare } from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
const { sign } = jwt;
export const commonApp = exp.Router();
config();

//Route for register
commonApp.post("/users", async (req, res) => {
  try {
    let allowedRoles = ["USER", "AUTHOR"];

    // get user from request body
    const newUser = req.body;

    // check role
    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // check if email already exists
    const existingUser = await UserModel.findOne({ email: newUser.email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // hash password
    newUser.password = await hash(newUser.password, 12);

    // create new user document
    const newUserDoc = new UserModel(newUser);

    // save document
    await newUserDoc.save();

    // send response
    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

//Route for Login(USER, AUTHOR and ADMIN)
commonApp.post("/login", async (req, res) => {
  //console.log(req.body)
  //get user cred obj
  const { email, password } = req.body;
  //find user by email
  const user = await UserModel.findOne({ email: email });
  //if use not found
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  //compare password
  const isMatched = await compare(password, user.password);
  //if passwords not matched
  if (!isMatched) {
    return res.status(400).json({ message: "Invalid password" });
  }
  //create jwt
  const signedToken = sign({id:user._id, email: email, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });

  //set token to res header as httpOnly cookie
  res.cookie("token", signedToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  //remove password from user document
  let userObj = user.toObject();
  delete userObj.password;

  //send res
  res.status(200).json({ message: "login success", payload: userObj });
});

//Route for Logout
commonApp.get("/logout",  (req, res) => {
  //delete token from cookie storage
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  //send res
  res.status(200).json({message:"Logout success"})
});

//Page refresh
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({
    message: "authenticated",
    payload: req.user,
  });
});


//Change password
commonApp.put("/password",verifyToken("USER","AUTHOR","ADMIN"),async (req,res) => {
  try{
  //check current passowrd and new password are same
  const passwords =req.body
  if(passwords.currentpassword===passwords.newpassword)
    return res.status(500).json({message:"The passwords entered are same"})
  //get current password of user/author/admin
  const userId=req.user?.id
  const user=await UserModel.findById(userId)
  //check current password sent by client with the database
  const isMatch = await compare(passwords.currentpassword, user.password);
  if (!isMatch) {
     return res.status(400).json({ message: "Wrong current password" });
  }
  //hash new password
  const hashedpassword = await hash(passwords.newpassword, 12);
  //replace current password of user with hashed new password 
  user.password=hashedpassword
  await user.save()
  res.status(200).json({message:"Passowrd Updated Successfully"})
  }
  catch(err)
  {
    res.status(404).json({message:"Password Updation Failed",payload:err.message})
  }
})