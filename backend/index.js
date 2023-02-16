/* eslint-disable quotes */
const express = require("express");
const connectToMongo = require("./db");

const app = express();
const port = 5173;

connectToMongo();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
