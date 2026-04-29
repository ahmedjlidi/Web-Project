import { useState } from "react";
import "./AddTask.css";

function AddTask({ setTasks, onClose }) {
    const [title, setTitle] = useState("");
    const [estimatedDuration, setEstimatedDuration] = useState("");
    const [difficulty, setDifficulty] = useState(3);
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState(3);
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const newTask = {
            taskID: Date.now(),
            userID: 1,
            title: title,
            estimatedDuration: Number(estimatedDuration),
            deadline: deadline,
            difficulty: Number(difficulty),
            priority: Number(priority),
            category: category,
            notes: notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            currentProgress: 0
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);

        setTitle("");
        setEstimatedDuration("");
        setDifficulty(3);
        setDeadline("");
        setPriority(3);
        setCategory("");

        if (onClose) onClose();
    }

    return (
        <div className="add-task-overlay">
            <form className="add-task-card" onSubmit={handleSubmit}>
                <div className="add-task-header">
                    <h2>Create New Task</h2>

                    <button type="button" className="close-button" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="form-group">
                    <label>Task Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Estimated Time (min)</label>
                        <input
                            type="number"
                            min="1"
                            value={estimatedDuration}
                            onChange={(e) => setEstimatedDuration(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Difficulty (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Deadline</label>
                        <input
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select category</option>
                        <option value="Studying">Studying</option>
                        <option value="Revision">Revision</option>
                        <option value="Project">Project</option>
                        <option value="Work">Work</option>
                        <option value="Homework">Homework</option>
                        <option value="Research">Research</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        placeholder="Add any extra details about the task..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                    />
                </div>

                <div className="add-task-actions">
                    <button type="button" className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>

                    <button type="submit" className="create-button">
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTask;