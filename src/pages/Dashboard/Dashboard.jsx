import { useState } from 'react';
import { Plus, Target, TrendingUp, Clock, AlertTriangle, CheckSquare } from "lucide-react";
import './Dashboard.css';

const MOCK_TASKS = [
    { id: 1, title: "Database Schema Design", deadline: "2026-04-10", status: "in_progress", priority: "High" },
    { id: 2, title: "UI Implementation", deadline: "2026-04-08", status: "in_progress", priority: "Urgent" },
];

export default function Dashboard() {
    const [tasks] = useState(MOCK_TASKS);

    return (
        <div className="dashboard-container">
            {}
            <header className="dash-header">
                <div className="welcome-text">
                    <h1>Welcome back, Scholar </h1>
                    <p>Let's make today productive. You have {tasks.length} priority tasks.</p>
                </div>
                <button className="new-task-btn">
                    <Plus size={18} /> New Task
                </button>
            </header>

            {/* Metrics Grid */}
            <div className="metrics-grid">
                <StatCard label="Focus Efficiency" value="87%" icon={<Target />} color="blue" />
                <StatCard label="Reliability Index" value="92%" icon={<TrendingUp />} color="green" />
                <StatCard label="Time Estimation" value="15m" icon={<Clock />} color="orange" />
                <StatCard label="Active Tasks" value={tasks.length} icon={<AlertTriangle />} color="red" />
            </div>

            {}
            <section className="tasks-section">
                <h2>Priority Action Items</h2>
                <div className="task-grid">
                    {tasks.map(task => (
                        <div key={task.id} className="static-task-card">
                            <div className="task-badge">{task.priority}</div>
                            <h3>{task.title}</h3>
                            <p>Due: {task.deadline}</p>
                            <div className="task-status">
                                <span className={`dot ${task.status}`}></span>
                                {task.status.replace('_', ' ')}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function StatCard({ label, value, icon, color }) {
    return (
        <div className={`stat-card ${color}`}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-info">
                <p>{label}</p>
                <h3>{value}</h3>
            </div>
        </div>
    );
}