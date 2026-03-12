import jwt from 'jsonwebtoken'
const {verify}=jwt
export function verifyToken(req,res,next){
    //token verification logic
    //console.log("token obj is:",req.cookies.token)
    const token=req.cookies?.token
    console.log(token)
    //if req from unauthorized user
    if(!token){
        return res.status(401).json({message:"Please Login"})
    }
    try{
    //if token is existed
    const decodedToken = verify(token,"abcdef");
    //attach decoded to request object
    req.user=decodedToken
    console.log(decodedToken)
    //call next
    next()
    }
    catch(err)
    {
        res.status(401).json({message:"Session Expired. plz login"})
    }


}