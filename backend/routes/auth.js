const user = require("../models/User");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
require('dotenv').config();

const JWT_secret = process.env.REACT_APP_JWT_SECRET;

//ROUTE 1 : creating an user account POST : /api/auth/createuser
router.post(
  "/createuser",
  [
    // CHECK 1 : where entered credentials are checking by the validation function.
    body("name", "Enter a valid name").isLength({ min: 4 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be of atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let outcome = false;
    // VALIDATION RESULTS : if error occured at validation so it will return type and place of error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({outcome, errors: errors.array() });
    }
    try {
      // CHECK 2 : we dont want two or more user of same email id (we are checking it with existing app database).
      let newUser = await user.findOne({ email: req.body.email });
      if (newUser) {
        return res.status(400).json({outcome, message : "User already exists"});
      }
      // NOTE :Gonna create a document of new user after passing all checks with some additional security.
      // salt and hash we are using to ensure better security to the user.
      // gensalt() function creates a unique set of number or letters which add-up to the actual password
      // then hash is created from that salt and our password.
      const salt = await bcrypt.genSalt(10);
      // secpass is storing a hashed password which comprises of user's password and salt.
      const secPass = await bcrypt.hash(req.body.password, salt);
      // DOCUMENT CREATION : User entered data is being send to the user defined schema to store it into the database.
      newUser = await user.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      // Creating json web token for further use in other routes and to get rid of entering credentials again and again.
      const data = {
        newUser: {
          id: newUser.id,
        },
      };
      const auth_token = jwt.sign(data, JWT_secret);
      if(auth_token){
        outcome = true;
      }
      res.json({outcome,auth_token });
    } catch (error) {
      // throw errors.
      console.error(error.message);
      res.status(500).send("Internal server Error Occured");
    }
  }
);

// ROUTE 2 : Authenticate a user using : POST /api/auth/login . login required (No sign up required)
router.post(
  "/login",
  //REQUESTING : user need to enter email and password to enter into the app. By clicking on the submit btn user will gonna create a request to verify and data will go along.
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let outcome = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({outcome, errors: errors.array() });
    }
    // EXTRACTION : extracting pass and email to verify it with the existing mongodb database.
    const { email, password } = req.body;
    try {
      // CHECK 1 : Email
      // user.findOne({ email }), it queries the MongoDB database to find a document where the "email" field matches the provided email. If there's a match, it retrieves the entire document associated with that email
      let existingUser = await user.findOne({ email });
      if (!existingUser) {
        return res.status(401).json({outcome, msg: "Invalid Credentials" });
      }
      // CHECK 2 : Password
      // entered password and stored password should match to verify user
      const existingPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!existingPassword) {
        return res.status(401).json({outcome, msg: "Invalid Credentials" });
      }
      // If everything is fine then generate token for that particular user & send it in json format
      const data = {
        newUser: {
          id: existingUser.id,
        },
      };
      // HERE : we creating a token by using the user id (stored in data-base) and jwt-secret-key which only backend knows
      const auth_token = jwt.sign(data, JWT_secret);
      console.log(auth_token);
      if(auth_token){
        outcome = true
      }
      // Sending token to the client
      res.json({outcome, auth_token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error Occured");
    }
  }
);

// ROUTE 3 : Logged in user details: POST : "api/auth/getuser".
// fetchuser function : is a middleware acting as a bridge to make id avaiable, to fetch entire document from the database.
router.post("/getuser",fetchuser, async (req, res) => {
  try {
    
    const userId = req.userDetails;
    //FINDBYID : method to find document.
    //SELECT : method used to specify which fields should be included or excluded in the query result.
    const User = await user.findById(userId).select("-password");
    res.send(User);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error Occured");
  }
});
module.exports = router;
