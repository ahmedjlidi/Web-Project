import { useEffect, useState } from "react";
import "./AdminPanel.css";

function AdminPanel() {
  const [tasks, setTasks] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [summary, setSummary] = useState({
  totalUsers: 0,
  totalTasks: 0,
});
useEffect(() => {
  const token = sessionStorage.getItem("token");

  if (!token) return;

  fetch("http://localhost:3501/api/tasks/admin/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Admin summary:", data);

      setSummary({
        totalUsers: data.totalUsers || 0,
        totalTasks: data.totalTasks || 0,
      });
    })
    .catch((err) => console.log(err));
}, []);
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    fetch(
      `http://localhost:3501/api/tasks?username=${encodeURIComponent(
        searchQuery
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setTasks([]);
      });
  }, [searchQuery]);

  function handleSearch() {
    setSearchQuery(searchName.trim());
    setIsDirty(false);
  }

  function handleClearSearch() {
    setSearchName("");
    setSearchQuery("");
    setIsDirty(false);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3501/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
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

      <div className="admin-stats-grid">
    <div className="admin-stat-card">
      <p>Total Users</p>
      <h2>{summary.totalUsers}</h2>
    </div>

     <div className="admin-stat-card">
        <p>Total Tasks</p>
        <h2>{summary.totalTasks}</h2>
      </div>
    </div>
      <div className="admin-search-row">
        <input
          type="text"
          placeholder="Search by username"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setIsDirty(true);
            setTasks([]);
          }}
          className="admin-search-input"
        />

        <button onClick={handleSearch} className="admin-search-btn">
          Search
        </button>

        <button onClick={handleClearSearch} className="admin-clear-btn">
          Clear
        </button>
      </div>

      {isDirty && searchName.trim() !== "" ? (
        <p>Click Search to show results for "{searchName}".</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="admin-task-card">
            <h3 className="admin-task-title">{task.title}</h3>

            <p className="admin-task-info">
              User: {task.userID?.username || "Unknown user"}
            </p>

            <p className="admin-task-info">
              Email: {task.userID?.email || "No email"}
            </p>

            <p className="admin-task-info">Priority: {task.priority}</p>
            <p className="admin-task-info">Category: {task.category}</p>
            <p className="admin-task-info">
              Progress: {task.currentProgress || 0}%
            </p>

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