const user = require("../models/User");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// we will gonna create the user POST : /api/auth/createuser : No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 4 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be of atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      // below code checks for validation errors using express-validator and sends a response with error details if any validation errors are found. 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      ///below function is sending the data into userschema and then storing it in mongodb
      const newUser = await user.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json(newUser);
      console.log(newUser)
    } catch (error) {
      // throw errors related to the schema
      console.log(error);
      res.json(error);
    }
  }
);

module.exports = router;

// Note : password shouldnot be store in the plain text

