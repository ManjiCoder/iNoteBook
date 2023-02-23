/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-shorthand */
/* eslint-disable quotes */
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const user = require("../models/User");

const JWT_SECRET = "Manji_The_Mountain_Man-21";
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

    try {
      // To check whether User with this email exists
      const duplicateEmail = await User.findOne({ email: req.body.email });
      // console.log(duplicateEmail);
      if (duplicateEmail) {
        return res
          .status(400)
          .json({ error: "Sorry user with this email is already exists." });
      }
      // Hash Password & Adding Salt
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);
      // Create a new user & Saving User to the MongoDB
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });
      // const newUser = await User(req.body).save();
      console.log("User saved to the MongoDB Successfully.");
      const data = {
        user: {
          id: newUser.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // res.json(newUser);
      console.log({ data, authToken });
      res.json({ authToken });
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
