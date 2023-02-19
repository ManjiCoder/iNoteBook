/* eslint-disable object-shorthand */
/* eslint-disable quotes */
const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// Creating a User using: POST => "/api/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    // If there are errors, return Bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // To check whether User with this email exists
    const duplicateEmail = await User.findOne({ email: req.body.email });
    // console.log(duplicateEmail);
    if (duplicateEmail) {
      return res
        .status(400)
        .json({ error: "Sorry user with this email is already exists." });
    }
    // Create a new user & Saving User to the MongoDB
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // const newUser = await User(req.body).save();
      console.log("User saved to the MongoDB Successfully.");
      res.json(newUser);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        error: "Some error occured",
        message: err.message,
      });
    }
    // eslint-disable-next-line comma-dangle
  }
);

module.exports = router;

// Side Note
/*
  PROBLEM: Duplicate email exist ho raha hai tho test db me problem h
  ANSWERS: fintOne use Karo
  TODO:  Indexs kya h ?
*/
