const express = require("express");
const router = express.Router();
const userNote = require("../models/Notes");
const userDocument = require("../models/User")
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//Route 1 : Fetch existing notes by using --->> GET : /api/notes/fetchusernote
// fetchuser --> middleware.
router.get("/fetchusernote", fetchuser, async (req, res) => {
  try {
    // MIDDLEWARE USE : getting id of the user.
    const fetchingNote = await userNote.find({ user: req.userDetails });
    res.send(fetchingNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("error related to fetch notes ");
  }
});

// ROUTE 2 : create note -->> POST : /api/notes/addnote
router.post(
  "/addnote",
  [
    // CHECK 1 : validation checks.
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description atleast must be of 5 characters").isLength(
      { min: 5 }
    ),
    body("tag", "enter for better clarification"),
  ],
  fetchuser,
  async (req, res) => {
    //CHECK 2 : Express Validation check.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const username = await userDocument.findById(req.userDetails)
    try {
      // DOCUMENT CREATION : through methods and values.
      const createdNote = await userNote.create({
        user: req.userDetails,
        username : username.name,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      res.send(createdNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3 : Update existing note -->> PUT : /api/notes/updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
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
    // Finding a note to update it after some checks.
    // CHECK 1 : finding a note by using document id (giving it into route).
    let foundNote = await userNote.findById(req.params.id);
    if (!foundNote) {
      return res.status(404).send("The note is not available");
    }
    // CHECK 2 : If the user who tries to update this note is the owner of it.
    if (foundNote.user.toString() !== req.userDetails) {
      return res.status(401).send("You are not authorized to");
    }
    // UPDATE : Note (or document) with new values by using mongoose function.
    await userNote.findByIdAndUpdate(
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

// ROUTE 4 : Delete existing note -->> PUT : /api/notes/deletenote
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // Find a note and then delete it after some checks.
  try {
    // CHECK 1 : finding a note (or document) by using that note id (giving it into route).
    let foundNote = await userNote.findById(req.params.id);
    if (!foundNote) {
      return res.status(404).send("The note is not available");
    }
    // CHECK 2 : If the user who tries to delete this note is the owner of it.
    if (foundNote.user.toString() !== req.userDetails) {
      return res.status(401).send("You are not authorized to");
    }
    // UPDATE : Note with new values by using mongoose function.
    await userNote.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted ", foundNote: foundNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
