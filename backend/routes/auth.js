const user = require("../models/User");
const express = require("express");
// import { body, matchedData } from 'express-validator';
const { body, validationResult } = require("express-validator");
const router = express.Router();

// through this file we will gonna deal with login and sign up of the user
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 4 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be of atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // res.json([])
    //res we use to send things
    // req.body will be assessible only through middleware
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newUser = await user.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json(newUser);
      console.log(newUser)
    } catch (error) {
      console.log(error);
      res.json(error);
    }
    /// through below function we are sending the data into userschema and then storing it in mongodb
    // res.send(req.body);
    // console.log(req.body)
    // const userdata = user(req.body);
    // broadly by using user(req.body) we are sending the data into the schema which we made and checking it then, we are storing it into the variable which we have
    // userdata.save();
    // this save function which led to the save of the data in mongo  db
  }
);

module.exports = router;

// Note : password shouldnot be store in the plain text
// Note : body name , email and password these codes belongs to the user validation format which we want as to be , it will keep track of the format
