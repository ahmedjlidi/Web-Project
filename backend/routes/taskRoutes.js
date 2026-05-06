const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskProgress,
  deleteTask,
  getAnalyticsSummary,
  getAdminSummary,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", protect, getTasks);

router.get("/analytics/summary", protect, getAnalyticsSummary);

router.get("/admin/summary", protect, getAdminSummary);

router.get("/:id", protect, getTaskById);

router.post("/", protect, createTask);

router.put("/:id", protect, updateTask);

router.patch("/:id/progress", protect, updateTaskProgress);

router.delete("/:id", protect, deleteTask);

module.exports = router;