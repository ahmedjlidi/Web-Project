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

  function isOverdue(task) {
    if (!task.deadline) return false;

    const deadlineDate = new Date(task.deadline);
    const now = new Date();

    if (isNaN(deadlineDate.getTime())) return false;

    return now > deadlineDate && task.currentProgress < 100;
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:3501/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          console.log("Tasks error:", data.message);
          return [];
        }

        return data;
      })
      .then((data) => {
        const mappedTasks = data.map((task) => ({
          taskID: task._id,
          userID: task.userID,
          title: task.title,
          estimatedDuration: task.estimatedDuration,

          // Keep raw date. Do not format here.
          deadline: task.deadline,

          difficulty: Number(task.difficulty),
          priority: Number(task.priority),
          category: task.category,
          notes: task.notes,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          completedAt: task.completedAt,
          currentProgress: task.currentProgress || 0,
        }));

        setTasks(mappedTasks);
      })
      .catch((err) => console.log("Error loading tasks:", err));
  }, [setTasks]);

  const pendingTasks = tasks.filter(
    (task) => task.currentProgress === 0 && !isOverdue(task)
  );

  const activeTasks = tasks.filter(
    (task) =>
      task.currentProgress > 0 &&
      task.currentProgress < 100 &&
      !isOverdue(task)
  );

  const overdueTasks = tasks.filter((task) => isOverdue(task));

  const completedTasks = tasks.filter(
    (task) => task.currentProgress >= 100
  );

  const incompleteTasks = tasks.filter(
    (task) => task.currentProgress < 100
  );

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
          <h2>{pendingTasks.length}</h2>
        </div>

        <div className="stat-card">
          <p>Active Tasks</p>
          <h2>{activeTasks.length}</h2>
        </div>

        <div className="stat-card">
          <p>Completed Tasks</p>
          <h2>{completedTasks.length}</h2>
        </div>

        <div className="stat-card">
          <p>Overdue Tasks</p>
          <h2>{overdueTasks.length}</h2>
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
          tasks={incompleteTasks}
          completedTasks={completedTasks}
          setTasks={setTasks}
        />
      )}
    </>
  );
}

export default Dashboard;