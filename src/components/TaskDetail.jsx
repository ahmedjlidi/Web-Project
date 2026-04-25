import "./TaskDetail.css";

function TaskDetail({
    title,
    estimatedDuration,
    deadline,
    difficulty,
    priority,
    category,
    notes,
    createdAt,
    updatedAt,
    progress,
    status,
    onClose
}) {
    return (
        <div className="task-detail-overlay">
            <div className="task-detail-modal">
                <div className="task-detail-header">
                    <h2>{title}</h2>

                    <button
                        className="task-detail-close"
                        onClick={onClose}
                        aria-label="Close task details"
                    >
                        ×
                    </button>
                </div>

                <div className="task-detail-section">
                    <h3>Task Summary</h3>

                    <div className="task-detail-grid">
                        <div>
                            <span className="detail-label">Estimated Time</span>
                            <p>{estimatedDuration} min</p>
                        </div>

                        <div>
                            <span className="detail-label">Deadline</span>
                            <p>{deadline}</p>
                        </div>

                        <div>
                            <span className="detail-label">Difficulty</span>
                            <p>{difficulty}</p>
                        </div>

                        <div>
                            <span className="detail-label">Priority</span>
                            <p>{priority}</p>
                        </div>

                        <div>
                            <span className="detail-label">Category</span>
                            <p>{category}</p>
                        </div>

                        <div>
                            <span className="detail-label">Status</span>
                            <p>{status}</p>
                        </div>
                    </div>
                </div>

                <div className="task-detail-section">
                    <h3>Progress</h3>

                    <div className="detail-progress-bar">
                        <div
                            className="detail-progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <p className="detail-progress-text">{progress}% completed</p>
                </div>

                <div className="task-detail-section">
                    <h3>Notes</h3>
                    <p className="task-notes">
                        {notes || "No notes added."}
                    </p>
                </div>

                <div className="task-detail-section">
                    <h3>Metadata</h3>

                    <div className="task-detail-grid">
                        <div>
                            <span className="detail-label">Created At</span>
                            <p>{createdAt}</p>
                        </div>

                        <div>
                            <span className="detail-label">Updated At</span>
                            <p>{updatedAt}</p>
                        </div>
                    </div>
                </div>

                <button className="start-focus-button">
                    Start Focus Session
                </button>
            </div>
        </div>
    );
}

export default TaskDetail;