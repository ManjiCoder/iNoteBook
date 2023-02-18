/* eslint-disable quotes */
const express = require("express");
const connectToMongo = require("./db");

const app = express();
const port = 5173;

// Calling ConnectToMongoDB ==> Function
connectToMongo();

// Available Routes
app.use("/api/login", require("./routes/auth"));
app.use("/api/notes", require("./routes/user"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
