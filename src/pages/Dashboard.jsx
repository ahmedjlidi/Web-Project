import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TaskList from "../components/TaskList";
import { useTasks } from "../components/TaskContext";
import "./Dashboard.css";

function Dashboard() {
  const { tasks, setTasks } = useTasks();
  const [showAddTask, setShowAddTask] = useState(false);

  const activeTasks = tasks.filter((task) => task.currentProgress < 100);
  const completedTasks = tasks.filter((task) => task.currentProgress >= 100);

  const pendingTasksCount = tasks.filter((task) => task.currentProgress === 0).length;
  const activeTasksCount = activeTasks.length;

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, student</h1>
          <p>
            Let&apos;s make today productive. You have {activeTasks.length} active tasks.
          </p>
        </div>

        <Button
          className="new-task-button"
          onClick={() => setShowAddTask(true)}
        >
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

      {tasks.length === 0 ? (
        <div className="empty-box">
          <h3>All caught up!</h3>
          <p>You have no tasks yet.</p>
        </div>
      ) : (
        <TaskList
          tasks={activeTasks}
          completedTasks={completedTasks}
          setTasks={setTasks}
        />
      )}
    </>
  );
}

export default Dashboard;