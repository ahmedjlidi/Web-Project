import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");
  const [level, setLevel] = useState("Medium");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") return;

    addTask({
      title,
      deadline,
      status,
      level,
    });

    setTitle("");
    setDeadline("");
    setStatus("Pending");
    setLevel("Medium");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;