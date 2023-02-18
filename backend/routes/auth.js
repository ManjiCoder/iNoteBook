/* eslint-disable quotes */
const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Creating a User using: POST => "/api/auth" Doesn't require Auth
router.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      console.log("User saved to the MongoDB Successfully.");
    })
    .catch((err) => {
      console.log(err.message);
    });
  res.json(user);
});

module.exports = router;
