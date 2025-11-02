const mongoose = require("mongoose");

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("mongodb connected successfully");
  } catch (err) {
    console.log("error found at connection : ", err.message);
  }
};

module.exports = connectDB;
