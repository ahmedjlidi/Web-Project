import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const activeTasks = tasks.filter((t) => t.status !== "Completed");
  const pendingTasksCount = tasks.filter((t) => t.status === "Pending").length;
  const activeTasksCount = activeTasks.length;

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, student 👋</h1>
          <p>
            Let&apos;s make today productive. You have {activeTasks.length} priority tasks.
          </p>
        </div>

        <Button className="new-task-button">
          + New Task
        </Button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Pending Tasks</p>
          <h2>{pendingTasksCount}</h2>
        </div>

        <div className="stat-card">
          <p>Active Tasks</p>
          <h2>{activeTasksCount}</h2>
        </div>
      </div>

      <div className="section-header">
        <h2>Priority Action Items</h2>
      </div>

      {activeTasks.length === 0 ? (
        <div className="empty-box">
          <h3>All caught up!</h3>
          <p>You have no tasks yet.</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {activeTasks.map((task) => (
            <div key={task.id} className="task-box">
              <h4>{task.title}</h4>
              <p>Status: {task.status}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Dashboard;