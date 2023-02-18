/* eslint-disable quotes */
const mongoose = require("mongoose");

/* USE ==> "mongodb://127.0.0.1:27017"  NOT !== "mongodb://localhost:27017" */
const mongoURL = "mongodb://127.0.0.1:27017";

const connectToMongo = () => {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Connected to the MongoDB Successfully.");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectToMongo;
