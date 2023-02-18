/* eslint-disable quotes */
const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017";

const connectToMongo = () => {
  console.time("connetingTime");
  mongoose.connect(mongoURL, () => {
    console.log("Connected to the MongoDB Successfully.");
  });
  console.timeEnd("connetingTime");
};

module.exports = connectToMongo;
