import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

const {verify}=jwt
config()

export const verifyToken= (...allowedRoles) =>{
    return async(req,res,next)=>{
   try { 
    //get token from cookie
    const token=req.cookies?.token
    //check token existed or not 
    if(!token){
        return res.status(401).json({Message:"Please Login first"})
    }
    //Validate token(decode the token)
    const decodedToken=verify(token,process.env.SECRET_KEY)

    //check the role is same as role in decodedToken
    if(!allowedRoles.includes(decodedToken.role)){
        return res.status(403).json({message:"You are not authorized due to different roles"})
    }
    //add decoded token
    req.user=decodedToken
    next()
   }
   catch(err)
   {
    res.status(401).json({Message:"Invalid Token"})
   }
 }
}