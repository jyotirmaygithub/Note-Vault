const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback")
const fetchuser = require("../middleware/fetchUser")
const { body, validationResult } = require("express-validator");


// ROUTE : Feedback submission.
router.post(
  "/userFeedback",
  [
    // CHECK 1 : validation checks.
    body("title", "Enter title"),
    body("message", "Enter your message"),
  ],
  fetchuser,
  async (req, res) => {
    //CHECK 2 : Express Validation check.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // DOCUMENT CREATION : through methods and values.
      const createdNote = await Feedback.create({
        user: req.userDetails,
        title: req.body.title,
        message: req.body.message,
      });
      res.send(createdNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


module.exports = router;
