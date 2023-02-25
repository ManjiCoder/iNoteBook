/* eslint-disable quotes */
const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");

const router = express.Router();

// ROUTE 1: Get all the note of User using: GET => "/api/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // Fetching all notes Of User by the help of fetchuser Middleware
    const allNotes = await Note.find({ user: req.user.id });
    res.json(allNotes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add Note of User using: POST => "/api/addnote". Login required
router.post(
  "/addnote",
  [
    body("title", "Title cannot be blank").exists(),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("tag", "Tag cannot be blank").exists(),
  ],
  fetchuser,
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    // If there are errors, return Bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      // storing all Note Schema value inside newNote
      const newNote = new Note({
        user: req.user.id,
        title,
        description,
        tag,
      });
      // Saving Note to db
      const saveNote = await newNote.save();
      console.log("User saved to the MongoDB Successfully.");
      res.json(saveNote);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    }
    // eslint-disable-next-line comma-dangle
  }
);
module.exports = router;
