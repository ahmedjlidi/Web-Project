import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import { useTasks } from "../components/TaskContext";
import NotificationBanner from "../components/NotificationBanner";
import logo from "../assets/logo.svg";
import "./Dashboard.css";

function Dashboard() {
  const { tasks, setTasks } = useTasks();
  const [showAddTask, setShowAddTask] = useState(false);
  const [user, setUser] = useState(null);

  function isOverdue(task) {
    if (!task.deadline) return false;

    const deadlineDate = new Date(task.deadline);
    const now = new Date();

    if (isNaN(deadlineDate.getTime())) return false;

    return now > deadlineDate && task.currentProgress < 100;
  }

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   const savedUser = sessionStorage.getItem("user");

  //   if (savedUser) {
  //     setUser(JSON.parse(savedUser));
  //   }

  //   if (!token) return;

  //   fetch("http://localhost:3501/api/tasks", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(async (res) => {
  //       const data = await res.json();

  //       if (!res.ok) {
  //         console.log("Tasks error:", data.message);
  //         return [];
  //       }

  //       return data;
  //     })
  //     .then((data) => {
  //       const mappedTasks = data.map((task) => ({
  //         taskID: task._id,
  //         userID: task.userID,
  //         title: task.title,
  //         estimatedDuration: task.estimatedDuration,
  //         deadline: task.deadline,
  //         difficulty: Number(task.difficulty),
  //         priority: Number(task.priority),
  //         category: task.category,
  //         notes: task.notes,
  //         createdAt: task.createdAt,
  //         updatedAt: task.updatedAt,
  //         completedAt: task.completedAt,
  //         currentProgress: task.currentProgress || 0,
  //       }));

  //       setTasks(mappedTasks);
  //     })
  //     .catch((err) => console.log("Error loading tasks:", err));
  // }, [setTasks]);

  useEffect(() => {
    const fetchTasks = () => {
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
    };

    fetchTasks(); // first load

    const interval = setInterval(fetchTasks, 3000); // 🔥 ADD THIS

    return () => clearInterval(interval); // 🔥 ADD THIS
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

  const notificationMessage =
    overdueTasks.length > 0
      ? `⚠️ You have ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? "s" : ""}.`
      : "";


  const completedTasks = tasks.filter(
    (task) => task.currentProgress >= 100
  );

  const incompleteTasks = tasks.filter(
    (task) => task.currentProgress < 100
  );

  function getWelcomeMessage() {
    if (tasks.length === 0) {
      return "You have no tasks! Add something and start working.";
    }

    if (completedTasks.length === tasks.length) {
      return "Good job. All your tasks are completed.";
    }

    if (overdueTasks.length > 0) {
      return `You have ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? "s" : ""}.`;
    }

    if (activeTasks.length > 0) {
      return `You have ${activeTasks.length} active task${activeTasks.length > 1 ? "s" : ""}.`;
    }

    if (pendingTasks.length > 0) {
      return `You have ${pendingTasks.length} pending task${pendingTasks.length > 1 ? "s" : ""}.`;
    }

    return "Check your task list and plan your next step.";
  }

  return (
    <main className="dashboard-main">
      <NotificationBanner externalMessage={notificationMessage} />

      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.username || "student"}</h1>
          <p>{getWelcomeMessage()}</p>
          {/* <p>
            Let&apos;s make today productive. You have {activeTasks.length} active tasks.
          </p> */}
        </div>

        <Button
          className="new-task-button"
          onClick={() => setShowAddTask(true)}
        >
          <span className="new-task-plus">+</span>
          <span>New Task</span>
        </Button>
      </div>

      {showAddTask && (
        <AddTask
          setTasks={setTasks}
          onClose={() => setShowAddTask(false)}
        />
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">○</div>
          <div>
            <p>Pending Tasks</p>
            <h2>{pendingTasks.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">↗</div>
          <div>
            <p>Active Tasks</p>
            <h2>{activeTasks.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">✓</div>
          <div>
            <p>Completed Tasks</p>
            <h2>{completedTasks.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">!</div>
          <div>
            <p>Overdue Tasks</p>
            <h2>{overdueTasks.length}</h2>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h2></h2>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-box">
          <div className="empty-icon">□</div>
          <h3>You have no tasks yet</h3>
          <p>Create your first task to start organizing your study work.</p>
          <button onClick={() => setShowAddTask(true)}>Add a Task</button>
        </div>
      ) : incompleteTasks.length === 0 ? (
        <>
          <div className="empty-box">
            <div className="empty-icon">✓</div>
            <h3>All caught up!</h3>
            <p>All your current tasks are completed. Add a new task when you are ready.</p>
            <button onClick={() => setShowAddTask(true)}>Add another task</button>
          </div>

          <TaskList
            tasks={[]}
            completedTasks={completedTasks}
            setTasks={setTasks}
          />
        </>
      ) : (
        <TaskList
          tasks={incompleteTasks}
          completedTasks={completedTasks}
          setTasks={setTasks}
        />
      )}
    </main>
  );
}

export default Dashboard;