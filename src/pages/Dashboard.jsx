import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TaskForm from "../TaskForm";
import TaskCard from "../TaskCard";
import "./Dashboard.css";

function Dashboard({ user, tasks, addTask }) {
  const [showForm, setShowForm] = useState(false);

  const activeTasks = tasks.filter((task) => task.status !== "Completed");

  const pendingTasksCount = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const activeTasksCount = tasks.filter(
    (task) => task.isRunning === true
  ).length;

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name} 👋</h1>
          <p>
            Let&apos;s make today productive. You have {activeTasks.length} priority tasks.
          </p>
        </div>

        <Button
          className="new-task-button"
          onClick={() => setShowForm((prev) => !prev)}
        >
          + New Task
        </Button>
      </div>

      {showForm && (
        <TaskForm
          addTask={addTask}
          closeForm={() => setShowForm(false)}
        />
      )}

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
          <p>You have no urgent tasks. Add a new one to get started.</p>
          <button type="button" onClick={() => setShowForm(true)}>
            Add a Task
          </button>
        </div>
      ) : (
        <div className="tasks-grid">
          {activeTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
}

export default Dashboard;