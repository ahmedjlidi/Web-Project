import { useState } from "react";
import "./Task.css";
import infoIcon from "../assets/info.png";
import TaskDetail from "./TaskDetail";

function Task({
    taskID,
    userID,
    title,
    estimatedDuration,
    deadline,
    difficulty,
    priority,
    category,
    notes,
    createdAt,
    updatedAt,
    onDone,
    onInfo,
    currentProgress
}) {
    const [showDetails, setShowDetails] = useState(false);

    const progress = currentProgress || 0;
    const isCompleted = progress >= 100;

    function handleDoneClick() {
        if (onDone) onDone(taskID);
    }

    function handleInfoClick() {
        setShowDetails(true);

        if (onInfo) onInfo(taskID);
    }

    function getStatusFromProgress(progress) {
        if (progress >= 100) {
            return "Completed";
        } else if (progress > 0) {
            return "In Progress";
        } else {
            return "Not Started";
        }
    }

    function getDifficultyMeta(value) {
        if (value <= 2) {
            return { label: "Easy", className: "difficulty-easy" };
        } else if (value === 3) {
            return { label: "Medium", className: "difficulty-medium" };
        } else {
            return { label: "Hard", className: "difficulty-hard" };
        }
    }

    function getPriorityMeta(value) {
        if (value === 1) {

            return { label: "Low", className: "priority-low" };
        } else if (value === 2) {

            return { label: "Medium", className: "priority-medium" };
        } else {
            return { label: "High", className: "priority-high" };
        }
    }

    const status = getStatusFromProgress(progress);
    const difficultyMeta = getDifficultyMeta(difficulty);
    const priorityMeta = getPriorityMeta(priority);

    return (
        <>
            <div className="task-card">
                <div className="task-top">
                    <button
                        className={`done-button ${isCompleted ? "done-active" : ""}`}
                        onClick={handleDoneClick}
                        aria-label="Mark task as done"
                    ></button>

                    <button
                        className="info-button"
                        onClick={handleInfoClick}
                        aria-label="Show task details"
                    >
                        <img src={infoIcon} alt="Info" />
                    </button>
                </div>

                <h2 className="task-title">{title}</h2>

                <div className="task-subinfo">
                    <span>{estimatedDuration} min</span>
                    <span>Due {deadline}</span>
                </div>

                <div className="task-badges">
                    <span className={`task-pill difficulty-pill ${difficultyMeta.className}`}>
                        {difficultyMeta.label}
                    </span>

                    <span className={`task-pill priority-pill priority-high`}>
                        {priorityMeta.label}
                    </span>
                </div>

                <div className="task-progress">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <span className="progress-text">
                        {status} ({progress}%)
                    </span>
                </div>
            </div>

            {showDetails && (
                <TaskDetail
                    title={title}
                    estimatedDuration={estimatedDuration}
                    deadline={deadline}
                    difficulty={difficultyMeta.label}
                    priority={priorityMeta.label}
                    category={category}
                    notes={notes}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    progress={progress}
                    status={status}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </>
    );
}

export default Task;