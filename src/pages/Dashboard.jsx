import { useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [tasks] = useState([
    { id: 1, title: "Database Schema Design", deadline: "2026-04-10", status: "In Progress" },
    { id: 2, title: "UI Implementation", deadline: "2026-04-08", status: "In Progress" },
  ]);

  return (
    <div className="dashboard-container">
      <h1>Welcome back, Scholar</h1>
      <p>You have {tasks.length} tasks today.</p>

      <div className="cards">
        <div className="card">
          <h3>Focus Efficiency</h3>
          <p>87%</p>
        </div>

        <div className="card">
          <h3>Reliability Index</h3>
          <p>92%</p>
        </div>

        <div className="card">
          <h3>Time Estimation</h3>
          <p>15m</p>
        </div>

        <div className="card">
          <h3>Active Tasks</h3>
          <p>{tasks.length}</p>
        </div>
      </div>

      <h2>My Tasks</h2>

      {tasks.map((task) => (
        <div key={task.id} className="task-box">
          <h3>{task.title}</h3>
          <p>Deadline: {task.deadline}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}