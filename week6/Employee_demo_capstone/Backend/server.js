import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { EmpApp } from './API/EmpAPI.js';
import cors from 'cors';

config();

const app=exp();

app.use(cors({
    origin:["http://localhost:5173"],
    }),
);

//use body parser middleware
app.use(exp.json())
//forward req to Userapp if path start with /user-api
app.use("/emp-api",EmpApp)

async function connectDB(){
    try{
    await connect(process.env.DB_URL)
    console.log("DB Connection Success")
    //start server
    app.listen(2000,()=>console.log("server on port 2000...."))
    }
    catch(err){
        console.log("Error in DB connection:",err)
    }
 }

 connectDB()

 //error handling middleware
app.use((err, req, res, next) => {
  console.log("err in middleware:", err.message);

  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });
})