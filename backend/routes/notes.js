const express = require("express");
const router = express.Router();
const userNotes = require("../models/Notes");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");


//Route 1 : Fetch all the notes by using --->> GET : /api/notes/fetchusernotes
// fetchuser --> middleware.
router.get("/fetchusernotes", fetchuser, async (req, res) => {
  try {
    // use of middlewar : getting id of the user.
    const fetchingNOtes = await userNotes.find({ user: req.userDetails });
    res.send(fetchingNOtes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("error related to fetch notes ");
  }
});

// ROUTE 2 : create notes -->> POST : /api/notes/addnotes
router.post(
    "/addnotes",
    [
      // First check : 
      body("title", "Enter a valid title").isLength({ min: 3 }),
      body("description", "Description atleast must be of 5 characters").isLength({min : 5}),
      body("tag", "enter for better clarification")
    ], fetchuser,
    async (req, res) => {
        //Second check :  Validation check.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        // Document Creation : through method and values 
      const creatednote =  await userNotes.create({
            user : req.userDetails,
            title :req.body.title,
            description : req.body.description ,
            tag : req.body.tag ,
        })
        res.send(creatednote)
      }  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
      
    }
  );
module.exports = router;
