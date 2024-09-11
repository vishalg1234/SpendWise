const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1');
    console.log("database is connected successfully");
  } catch (error) {
    console.log("error in connecting database ", error);
  }
};

module.exports = db;
