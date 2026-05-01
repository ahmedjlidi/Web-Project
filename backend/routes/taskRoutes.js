const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
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
router.get("/admin/all", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

<<<<<<< Updated upstream
router.get("/:id", async (req, res) => {
=======
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
>>>>>>> Stashed changes
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

router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create(req.body);

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
<<<<<<< Updated upstream
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
=======
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userID: req.user._id,
      },
      req.body,
      { returnDocument: "after" }
    );
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    const task = await Task.findByIdAndDelete(req.params.id);
=======
    const progress = Number(req.body.progress);

    const updateData = {
      currentProgress: progress,
    };

    if (progress >= 100) {
      updateData.completedAt = new Date();
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userID: req.user._id,
      },
      updateData,
      { returnDocument: "after" }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
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
>>>>>>> Stashed changes

    if (!task) {
      return res.status(404).json({ message: "Task not found or not allowed" });
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