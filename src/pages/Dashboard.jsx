import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import { useTasks } from "../components/TaskContext";
import NotificationBanner from "../components/NotificationBanner";
import "./Dashboard.css";

function Dashboard() {
  const { tasks, setTasks } = useTasks();
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
  const token = sessionStorage.getItem("token");

  if (!token) return;

  fetch("http://localhost:5001/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const mappedTasks = data.map((task) => ({
        taskID: task._id,
        userID: task.userID,
        title: task.title,
        estimatedDuration: task.estimatedDuration,
        deadline: task.deadline
          ? new Date(task.deadline).toLocaleString()
          : "",
        difficulty: task.difficulty,
        priority: Number(task.priority),
        category: task.category,
        notes: task.notes,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        currentProgress: task.currentProgress || 0,
      }));

      setTasks(mappedTasks);
    })
    .catch((err) => console.log("Error loading tasks:", err));
}, [setTasks]);

  const activeTasks = tasks.filter((task) => task.currentProgress < 100);
  const completedTasks = tasks.filter((task) => task.currentProgress >= 100);

  const pendingTasksCount = tasks.filter(
    (task) => task.currentProgress === 0
  ).length;

  const activeTasksCount = activeTasks.length;

  return (
    <>
      <NotificationBanner />
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