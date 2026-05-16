const mongoose = require("mongoose");

const connectDB = async () => {
  const { MONGO_URI } = process.env;
  await mongoose.connect(MONGO_URI);
  console.log("🏺 Database connected successfully.");
};

module.exports = connectDB;
