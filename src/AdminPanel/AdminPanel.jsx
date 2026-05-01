import { useEffect, useState } from "react";
import "./AdminPanel.css";

function AdminPanel() {
  const [tasks, setTasks] = useState([]);
useEffect(() => {
  const token = sessionStorage.getItem("token");

  fetch("http://localhost:5001/api/tasks/admin/all", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => setTasks(data))
    .catch((err) => console.log(err));
}, []);

  async function handleDelete(id) {
  const confirmDelete = window.confirm("Delete this task?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5001/api/tasks/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Delete failed");
      return;
    }

    setTasks((prev) => prev.filter((task) => task._id !== id));
    alert("Task deleted");
  } catch (err) {
    console.error("Delete error:", err);
    alert("Backend not running or delete request failed");
  }
}

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>
      <h2 className="admin-subtitle">Task Management</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="admin-task-card">
            <h3 className="admin-task-title">{task.title}</h3>

            <p className="admin-task-info">Priority: {task.priority}</p>
            <p className="admin-task-info">Category: {task.category}</p>

            <button
              className="admin-delete-btn"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPanel;