const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ userID: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

router.get("/analytics/summary", async (req, res) => {
  try {
    const tasks = await Task.find();

    const completed = tasks.filter((task) => task.status === "Completed").length;
    const active = tasks.filter((task) => task.status !== "Completed").length;

    res.json({
      estimationBias: -75,
      focusEfficiency: 33,
      taskCompletion: {
        completed,
        active
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get analytics" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to get task" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      ...req.body,
      userID: req.user._id,
      currentProgress: 0
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: error.message || "Failed to create task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

router.post("/:id/focus-session", async (req, res) => {
  try {
    const { duration, startedAt } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.focusSessions.push({
      duration,
      startedAt: startedAt || new Date()
    });

    await task.save();

    res.json({
      message: "Focus session started successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to start focus session" });
  }
});

module.exports = router;