const user = require("../models/User");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// we will gonna create the user POST : /api/auth/createuser : through this api or path user will gonna create his/her account
router.post(
  "/createuser",
  [
    // below one : is the first check where entered credentials by the user are checking by the validation function
    body("name", "Enter a valid name").isLength({ min: 4 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be of atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // below code checks for validation errors using express-validator and sends a response with error details if any validation errors are found.
    // this is the validation function (whatever error according to above checks array will gonna show it).
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // to have unique email from user ---> this will gonna check for the originality after matching entered email from the existing database.
      let newUser = await user.findOne({ email: req.body.email });
      if (newUser) {
        console.log("user already exist");
        return res.status(400).json("User already exists");
      }
      // Note : --->> these below codes are performing document creation function by adding some feature to the raw data entered by the user
      // salt and hash we are using to ensure better security to the user
      //gensalt() function creates a unique set of number or letters which add-up to the actual password
      // gensalt is differnent from the simple hash function because it generates unique salt for same password
      const salt = await bcrypt.genSalt(10);
      // secpass is storing a hash password which is comprise of actual and salt
      const secPass = await bcrypt.hash(req.body.password, salt);
      ///below function is sending the data into userschema and then storing it in mongodb
      newUser = await user.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      // by using this code we are creating token which will gonna add the functionality of not entering email and other basic things again and again -- >> a token will let the user enter without any headache
      const JWT_secret = "mynameisanthoneygonservice";
      const data = {
        newUser: {
          id: newUser.id,
        },
      };
      const auth_token = jwt.sign(data, JWT_secret);
      console.log(auth_token);

      //below sending the data into the tunderclinet as a response
      res.json({ auth_token });
    } catch (error) {
      // throw errors related to the schema
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// Authenticate a user using : POST /api/auth/login . NO login required

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
      let existingUser = user.findOne(email);
      if(!existingUser){
        return res.status(401).json({msg:"Invalid Credentials"});
      }
      const existingPassword = bcrypt.compare(password, user.password)
      if(!existingPassword){
        return res.status(401).json({msg:"Invalid Credentials"})
      }
    } catch (error) {
      
    }
  }
);
module.exports = router;

