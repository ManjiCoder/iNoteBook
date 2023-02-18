/* eslint-disable quotes */
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const obj = {
    name: "Manji",
    age: 21,
  };
  res.json(obj);
});

module.exports = router;
