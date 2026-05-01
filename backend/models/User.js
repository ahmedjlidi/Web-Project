const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    avatar: {
      type: String,
      default: ""
    },

    preferredSessionLength: {
      type: Number,
      default: 45,
      min: 1,
      max: 720
    },

    averageDailyStudyTime: {
      type: Number,
      default: 0,
      min: 0,
      max: 720
    },

    accuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);