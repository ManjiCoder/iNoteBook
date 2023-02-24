/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-shorthand */
/* eslint-disable quotes */
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = "Manji_The_Mountain_Man-21";
const router = express.Router();

// ROUTE 1: Creating a User using: POST => "/api/createuser". No login required
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
      // Creating AuthToken Using jsonwebtoken
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
      res.status(500).send("Internal Server Error");
    }
    // eslint-disable-next-line comma-dangle
  }
);

// ROUTE 2: Authenticate a User using: POST => "/api/login". login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    // If there are errors, return Bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // To check whether User with this email exists
      const newUser = await User.findOne({ email });
      // console.log(newUser);
      if (!newUser) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      // To compare user password with hash password
      const comparePassword = await bcrypt.compare(password, newUser.password); // => return boolean
      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      // Creating AuthToken Using jsonwebtoken
      const data = {
        user: {
          id: newUser.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log({ data, authToken });
      res.json({ authToken });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    }
    // eslint-disable-next-line comma-dangle
  }
);

// ROUTE 3: Get User Detail using: POST => "/api/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  // Getting user id from request header from middleware
  const userId = req.user.id;
  console.log(req.user.id);
  try {
    const loginUser = await User.findById(userId).select("-password");
    res.json(loginUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;

// Side Note
/*
  PROBLEM: Duplicate email exist ho raha hai tho test db me problem h
  ANSWERS: fintOne use Karo
  TODO:  Indexs kya h ?
  ANSWER: not use unique:true in model issue solve.
*/
