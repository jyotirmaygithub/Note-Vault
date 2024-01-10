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
    body("description", "Description atleast must be of 5 characters").isLength(
      { min: 5 }
    ),
    body("tag", "enter for better clarification"),
  ],
  fetchuser,
  async (req, res) => {
    //Second check :  Validation check.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Document Creation : through method and values
      const creatednote = await userNotes.create({
        user: req.userDetails,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      res.send(creatednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3 : Update existing note -->> PUT : /api/notes/updatenotes
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  // create a newnote object to update the existing one.
  const { title, description, tag } = req.body; // destruturing
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // Find a note and then update it after some checks.
  try {
    // CHECK 1 : finding a note (or document) by using that note id (giving it into route).
    let foundNote = await userNotes.findById(req.params.id);
    if (!foundNote) {
      return res.status(404).send("The note is not available");
    }
    // CHECK 2 : If the user who tries to update this note is the owner of it.
    if (foundNote.user.toString() !== req.userDetails) {
      return res.status(401).send("You are not authorized to");
    }
    // UPDATE : Note (or document) with new values by using mongoose function.
    await userNotes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(newNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
