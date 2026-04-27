const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  estimatedTime: Number,
  difficulty: Number,
  deadline: Date,
  priority: String,
  category: String,
  notes: String,
  progress: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);