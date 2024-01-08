var jwt = require("jsonwebtoken");
// we are creating a middleware to fetch user id 
// middle-ware is a function 

const JWT_secret = "mynameisanthoneygonservice";

function fetchuser(req,res,next){
    const token = req.header("auth-token")
    if(!token){
        return res.status(401).send({msg:"No Token Provided"})
    }
    try {
        const data = jwt.verify(token , JWT_secret)
        req.user = data;
        next()
    } catch (error) {
        return res.status(401).send({msg : 'Invalid Token'});
    }
    
}

module.exports = fetchuser