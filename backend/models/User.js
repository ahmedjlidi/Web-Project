const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  profilePicture: String,
  sessionLength: Number,
  studyTime: Number,
  accuracy: Number,
});

module.exports = mongoose.model("User", userSchema);