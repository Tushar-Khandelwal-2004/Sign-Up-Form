const jwt=require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_USER;
function authToken(req,res,next){
    const token=req.headers.token;
    if(!token){
        return res.status(403).send({
            message:"You must signin First",
            success:false
        })
    }
    const decodedInfo=jwt.verify(token,JWT_SECRET);
    if(decodedInfo){
        req.userId=decodedInfo.id;
        next();
    }
    else{
        res.status(403).send({
            success:false,
            message:"Incorrect Token!!"
        })
    }
}
module.exports={
    authToken
}