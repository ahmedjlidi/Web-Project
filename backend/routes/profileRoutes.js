const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

router.put("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = req.body.username || user.username;
    user.avatar = req.body.avatar ?? user.avatar;
    user.preferredSessionLength =
      req.body.preferredSessionLength ?? user.preferredSessionLength;
    user.averageDailyStudyTime =
      req.body.averageDailyStudyTime ?? user.averageDailyStudyTime;
    user.accuracy = req.body.accuracy ?? user.accuracy;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      preferredSessionLength: updatedUser.preferredSessionLength,
      averageDailyStudyTime: updatedUser.averageDailyStudyTime,
      accuracy: updatedUser.accuracy,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});

module.exports = router;