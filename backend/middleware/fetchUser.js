var jwt = require("jsonwebtoken");
// Middleware : To fetch user details and its a function

const JWT_secret = "mynameisanthoneygonservice";

function fetchuser(req,res,next){
    const token = req.header("auth-token")
    if(!token){
        return res.status(401).send({msg:"No Token Provided"})
    }
    try {
        const data = jwt.verify(token , JWT_secret)
        // / req in Express.js is an object with the ability to store and share data throughout the request-response cycle. allowing modifications made in earlier middleware functions to be accessible in subsequent ones. This makes req a convenient means of passing and retaining information within the context of a specific request.
        req.userDetails = data.newUser.id;
        // to start next opetation.
        next()
    } catch (error) {
        return res.status(401).send({msg : 'Invalid Token'});
    }
    
}

module.exports = fetchuser