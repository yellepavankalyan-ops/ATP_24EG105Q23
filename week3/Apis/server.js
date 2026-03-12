import exp from 'express'
import { connect } from 'mongoose'
import { userApp } from './APIs/UserAPI.js'
import { productApp } from './APIs/ProductAPI.js'
import cookieParser from 'cookie-parser'
const app=exp()
//app.listen(4000,()=>console.log("server on port 4000...."))//if DB connection has failed then there is no use of http server so first we need to check db connection and later http server

//use body parser middleware
app.use(exp.json())

//add cookie parser middleware
app.use(cookieParser())

//forward req to Userapp if path start with /user-api
app.use("/user-api",userApp)
//forward req to Productapp if path start with /product-api
app.use("/product-api",productApp)

//connect to db server
 async function connectDB(){
    try{
    await connect("mongodb://localhost:27017/mydb")
    console.log("DB Connection Success")
    //start server
    app.listen(4000,()=>console.log("server on port 4000...."))
    }
    catch(err){
        console.log("Error in DB connection:",err)
    }
 }

 connectDB()

 //error handling middleware
 app.use((err,req,res,next)=>{
    //ValidationError
    if(err.name==='ValidationError'){
      return res.status(400).json({message:"Error Occured",error:err.message})
    }
    //CastError
    if(err.name==='CastError'){
      return res.status(400).json({message:"Error occured",error: err.message})
    }
    //send server side error
    res.status(500).json({message:"error occured",error:"Server side error"})
    })
