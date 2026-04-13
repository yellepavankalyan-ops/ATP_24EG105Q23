import exp from 'express'
import {config} from 'dotenv'
import {connect} from 'mongoose'
import { userApp } from './API/UserAPI.js'
import { authorApp } from './API/AuthorAPI.js'
import { adminApp } from './API/AdminAPI.js'
import { commonApp } from './API/CommonAPI.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

config()

//create express app
const app=exp()

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}),);

//body parser middleware
app.use(exp.json())
//add cookie parser middleware
app.use(cookieParser())

//path level middleware
app.use("/user-api",userApp);
app.use("/author-api",authorApp)
app.use("/admin-api",adminApp)
app.use("/common-api",commonApp)

//connect to DB
const connectDB=async() => {
    try{
        await connect(process.env.DB_URL)
        console.log("DB connected")
        //assign port
        const port= process.env.PORT  ||5000
        app.listen(port,() =>console.log(`Server listening on ${port}...`))
    }
    catch(err)
    {
        console.log("Error in Db connection",err);
    }
}

connectDB()

//to handle invalid path
app.use((req,res,next)=>{
    res.status(404).json({message:`path ${req.url} is invalid`})
})

//Error handling middleware
app.use((err, req, res, next) => {
  console.log("error is ",err)
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});