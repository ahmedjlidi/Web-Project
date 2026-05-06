const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createSession,
    getSessions
} = require("../controllers/studySessionController");

router.post("/", protect, createSession);
router.get("/", protect, getSessions);

module.exports = router;