const Task = require("../models/Task");
const User = require("../models/User");

const getTasks = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const username = req.query.username;

      let query = {};

      if (username && username.trim() !== "") {
        const users = await User.find({
          username: { $regex: username.trim(), $options: "i" },
        }).select("_id");

        query.userID = { $in: users.map((user) => user._id) };
      }

      const tasks = await Task.find(query)
        .populate("userID", "username email")
        .sort({ createdAt: -1 });

      return res.json(tasks);
    }

    const tasks = await Task.find({ userID: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    console.log("GET TASKS ERROR:", error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
};

const getAnalyticsSummary = async (req, res) => {
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
};

const getAdminSummary = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();

    res.json({
      totalUsers,
      totalTasks,
    });
  } catch (error) {
    console.log("ADMIN SUMMARY ERROR:", error);
    res.status(500).json({ message: "Failed to get admin summary" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const query =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userID: req.user._id };

    const task = await Task.findOne(query).populate("userID", "username email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.log("GET ONE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to get task" });
  }
};

const createTask = async (req, res) => {
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
    console.error("Create task error:", error);
    res.status(500).json({
      message: error.message || "Failed to create task",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const query =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userID: req.user._id };

    const task = await Task.findOneAndUpdate(query, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.log("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

const updateTaskProgress = async (req, res) => {
  try {
    const progress = Number(req.body.progress);

    if (Number.isNaN(progress) || progress < 0 || progress > 100) {
      return res.status(400).json({
        message: "Progress must be between 0 and 100",
      });
    }

    const updateData = {
      currentProgress: progress,
    };

    if (progress >= 100) {
      updateData.completedAt = new Date();
    }

    const query =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userID: req.user._id };

    const task = await Task.findOneAndUpdate(query, updateData, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.log("PROGRESS UPDATE ERROR:", error);
    res.status(500).json({ message: "Failed to update progress" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const query =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userID: req.user._id };

    const task = await Task.findOneAndDelete(query);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("DELETE TASK ERROR:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskProgress,
  deleteTask,
  getAnalyticsSummary,
  getAdminSummary,
};