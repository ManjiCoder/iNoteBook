/* eslint-disable quotes */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");

const router = express.Router();

// ROUTE 1: Get all the note of User using: GET => "/api/notes/fetchallnotes". Login required
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

// ROUTE 2: Add Note of User using: POST => "/api/notes/addnote". Login required
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
  }
);

// ROUTE 3: Update an existing Note of User using: PUT => "/api/notes/updatenote". Login required
router.put(
  "/updatenote/:id",
  [
    body("title", "Title cannot be blank").exists(),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("tag", "Tag cannot be blank").exists(),
  ],
  fetchuser,
  async (req, res) => {
    // If there are errors, return Bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      // if there are change that is store inside newNote
      // Create new Note Object
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      // Find the note to be update & update it
      const checkNote = await Note.findById(req.params.id);

      // if req.params.id is not valid
      if (!checkNote) return res.status(404).send("Not Found");
      // if login user.id & the note that is to be update user.id is not same
      if (checkNote.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      // Update Note Object
      const updateNote = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ msg: "Note has been updated successfully", updateNote });
    } catch (err) {
      if (
        // eslint-disable-next-line operator-linebreak
        err.message ===
        `Cast to ObjectId failed for value "${req.params.id}" (type string) at path "_id" for model "notes"`
      ) {
        return res.status(404).send("Not Found");
      }
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 4: Delete an existing Note of User using: DELETE => "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete & delete it
    const checkNote = await Note.findById(req.params.id);
    // if req.params.id is not valid
    if (!checkNote) return res.status(404).send("Not Found");
    // Allow deletion only if user owns this checkNote
    // if login user.id & the note that is to be delete user.id is not same
    if (checkNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: "Note has been delete successfully", deleteNote });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete all Note of User using: DELETE => "/api/notes/deleteallnotes". Login required
router.delete("/deleteallnotes", fetchuser, async (req, res) => {
  try {
    const deleteNote = await Note.deleteMany({ user: req.user.id });
    res.json({ msg: "Note has been delete successfully", deleteNote });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 4: Delete all Note of User using: PUT => "/api/notes/deleteallnotes". Login required
router.put("/updateallnotes", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // if title,description,tag any field is present inside the body will be stored in newNotes Obj
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // if body is empty
    if (!title && !description && !tag) {
      return res.json({
        error: "Specifield the field that you want to update",
      });
    }
    const deleteNote = await Note.updateMany(
      { user: req.user.id },
      {
        $set: {
          title: newNote.title,
          description: newNote.description,
          tag: newNote.tag,
          login: true,
        },
      },
      { new: true }
    );
    res.json({ msg: "Note has been update successfully", deleteNote });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
