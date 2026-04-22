import React from "react";

function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Level:</strong> {task.level}</p>
      <p><strong>Deadline:</strong> {task.deadline || "No deadline"}</p>
    </div>
  );
}

export default TaskCard;