const mongoose = require("mongoose");

const StudySessionSchema = new mongoose.Schema(
    {
        taskID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true
        },

        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        startTime: {
            type: Date,
            required: true
        },

        endTime: {
            type: Date,
            required: true
        },

        duration: {
            type: Number,
            required: true
        },

        progressBefore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        progressAfter: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        focusRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        satisfactionRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        interruptions: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("StudySession", StudySessionSchema);