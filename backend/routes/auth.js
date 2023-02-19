/* eslint-disable quotes */
const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// Creating a User using: POST => "/api/auth" Doesn't require Auth
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  // eslint-disable-next-line consistent-return
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Saving User to the MongoDB
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => {
        console.log("User saved to the MongoDB Successfully.");
        res.json(user);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({
          err: "Please enter a unique value for email",
          message: err.message,
        });
      });
    // eslint-disable-next-line comma-dangle
  }
);

module.exports = router;

// Side Note
/*
  PROBLEM: Duplicate email exist ho raha hai tho test db me problem h
  ANSWERS: Delete testdb or yourdb
*/
