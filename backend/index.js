/* eslint-disable quotes */
const express = require("express");
const connectToMongo = require("./db");

const app = express();
const port = 5000;

// Calling ConnectToMongoDB ==> Function
connectToMongo();

// Middleware
app.use(express.json());

// Available Routes
app.use("/api", require("./routes/auth"));
app.use("/api/notes", require("./routes/user"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
