const mongoose = require("mongoose");
require("dotenv/config");

const connectDB = async (cb) => {
  try {
    let result = await mongoose.connect(process.env.MONGO_URI);
    if (result) return cb();
  } catch (err) {
    console.log("There was an error connecting to DB!");
  }
};

module.exports = connectDB;
