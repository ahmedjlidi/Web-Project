const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    estimatedDuration: {
      type: Number,
      required: true
    },

    deadline: {
      type: Date,
      required: true
    },

    difficulty: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 3
    },

    category: {
      type: String,
      required: true,
      enum: ["Studying", "Revision", "Project", "Work", "Homework", "Research"]
    },

    notes: {
      type: String,
      default: ""
    },

    currentProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    completedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);