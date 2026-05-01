const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ userID: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    console.log("GET TASKS ERROR:", error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

router.get("/analytics/summary", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ userID: req.user._id });

    const completed = tasks.filter(
      (task) => task.currentProgress >= 100
    ).length;

    const active = tasks.filter(
      (task) => task.currentProgress < 100
    ).length;

    res.json({
      estimationBias: -75,
      focusEfficiency: 33,
      taskCompletion: {
        completed,
        active,
      },
    });
  } catch (error) {
    console.log("ANALYTICS ERROR:", error);
    res.status(500).json({ message: "Failed to get analytics" });
  }
});

router.get("/admin/all", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const tasks = await Task.find()
      .populate("userID", "username email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    console.log("ADMIN GET TASKS ERROR:", error);
    res.status(500).json({ message: "Failed to get all tasks" });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const filter =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userID: req.user._id };

    const task = await Task.findOne(filter);

    if (!task) {
      return res.status(404).json({ message: "Task not found or not allowed" });
    }

    res.json(task);
  } catch (error) {
    console.log("GET ONE TASK ERROR:", error);
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
      currentProgress: 0,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    res.status(500).json({ message: error.message || "Failed to create task" });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const filter =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userID: req.user._id };

    const task = await Task.findOneAndUpdate(filter, req.body, {
      returnDocument: "after",
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found or not allowed" });
    }

    res.json(task);
  } catch (error) {
    console.log("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

router.patch("/:id/progress", protect, async (req, res) => {
  try {
    const progress = Number(req.body.progress);

    const updateData = {
      currentProgress: progress,
    };

    if (progress >= 100) {
      updateData.completedAt = new Date();
    }

    const filter =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userID: req.user._id };

    const task = await Task.findOneAndUpdate(filter, updateData, {
      returnDocument: "after",
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found or not allowed" });
    }

    res.json(task);
  } catch (error) {
    console.log("PROGRESS UPDATE ERROR:", error);
    res.status(500).json({ message: "Failed to update progress" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const filter =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userID: req.user._id };

    const task = await Task.findOneAndDelete(filter);

    if (!task) {
      return res.status(404).json({ message: "Task not found or not allowed" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("DELETE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;