import exp from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { empApp } from './empApi.js';
import cors from 'cors';

dotenv.config();

const app = exp();
const port = process.env.PORT || 3000;
//add cors middlewares
app.use(cors({
    origin:['http://localhost:5175'],
}),
);

app.use(exp.json())

//emp-api middelware routes
app.use("/emp-api",empApp)
//Db + server 
async function connectDB(){
    try{ 
         await connect(process.env.DB_URL);
        
        app.listen(3000,()=>{console.log(`server on port ${port}...`)})

        console.log("DB connection successfull...")
    } catch(err){
        console.log("error in DB connecction ",err)
    }
}
connectDB();
