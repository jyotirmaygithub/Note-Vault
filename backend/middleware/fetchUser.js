var jwt = require("jsonwebtoken");
// Middleware : To fetch user details and its a function
require('dotenv').config();

const JWT_secret = process.env.REACT_APP_JWT_SECRET;

function fetchuser(req,res,next){
    const token = req.header("auth-token")
    if(!token){
        return res.status(401).send({msg:"No Token Provided"})
    }
    try {
        const data = jwt.verify(token , JWT_secret)
        // in req object we are passing user id by extracting from the token.
        // / req in Express.js is an object with the ability to store and share data throughout the request-response cycle. allowing modifications made in earlier middleware functions to be accessible in subsequent ones. This makes req a convenient means of passing and retaining information within the context of a specific request.
        req.userDetails = data.newUser.id;
        // to start next opetation.
        next()
    } catch (error) {
        return res.status(401).send({msg : 'Invalid Token'});
    }
    
}

module.exports = fetchuser