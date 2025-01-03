const jwt=require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_USER;
function authToken(req,res,next){
    const token=req.headers.token;
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