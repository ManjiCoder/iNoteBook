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
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook - Backend app listening at http://localhost:${port}`);
});
