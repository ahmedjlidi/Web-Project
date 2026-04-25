import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TaskList from "../components/TaskList";
import "./Dashboard.css";
import AddTask from "../components/AddTask";

function Dashboard() {


  // In the future, Load from the database

  const [tasks, setTasks] = useState([
    {
      taskID: 101,
      userID: 1,
      title: "Web Project",
      estimatedDuration: 60,
      deadline: "Mar 2, 4:50 PM",
      difficulty: 3,
      priority: 2,
      category: "Project",
      notes: "Finish Task component styling",
      createdAt: "2026-03-28T10:00:00",
      updatedAt: "2026-03-29T14:00:00",
      currentProgress: 40
    },
    {
      taskID: 102,
      userID: 1,
      title: "Operating Systems",
      estimatedDuration: 90,
      deadline: "Mar 3, 8:00 PM",
      difficulty: 5,
      priority: 3,
      category: "Study",
      notes: "Review memory management slides",
      createdAt: "2026-03-28T11:00:00",
      updatedAt: "2026-03-29T15:00:00",
      currentProgress: 0
    }
  ]);

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

        {showAddTask && (
          <AddTask
            setTasks={setTasks}
            onClose={() => setShowAddTask(false)}
          />
        )}
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