const StudySession = require("../models/StudySession");
const Task = require("../models/Task");

exports.createSession = async (req, res) => {
    try {
        const {
            taskID,
            startTime,
            endTime,
            duration,
            progressBefore,
            progressAfter,
            focusRating,
            satisfactionRating,
            interruptions
        } = req.body;

        if (
            !taskID ||
            !startTime ||
            !endTime ||
            duration === undefined ||
            progressBefore === undefined ||
            progressAfter === undefined ||
            focusRating === undefined ||
            satisfactionRating === undefined ||
            interruptions === undefined
        ) {
            return res.status(400).json({
                message: "All study session fields are required"
            });
        }

        /*
          Make sure the task belongs to the logged-in user.
          This prevents a user from saving sessions for another user's task.
        */
        const task = await Task.findOne({
            _id: taskID,
            userID: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const session = await StudySession.create({
            taskID,
            userID: req.user._id,
            startTime,
            endTime,
            duration,
            progressBefore,
            progressAfter,
            focusRating,
            satisfactionRating,
            interruptions
        });

        /*
          Optional but recommended:
          update task progress after saving the session.
        */
        task.currentProgress = progressAfter;
        task.updatedAt = new Date();

        if (progressAfter >= 100 && !task.completedAt) {
            task.completedAt = new Date();
        }

        await task.save();

        res.status(201).json({
            message: "Study session saved successfully",
            session,
            task
        });
    } catch (error) {
        console.error("Create session error:", error);

        res.status(500).json({
            message: error.message || "Failed to save study session"
        });
    }
};

exports.getSessions = async (req, res) => {
    try {
        const sessions = await StudySession.find({
            userID: req.user._id
        })
            .populate("taskID", "title category estimatedDuration deadline")
            .sort({ createdAt: -1 });

        res.status(200).json(sessions);
    } catch (error) {
        console.error("Get sessions error:", error);

        res.status(500).json({
            message: "Failed to get study sessions"
        });
    }
};