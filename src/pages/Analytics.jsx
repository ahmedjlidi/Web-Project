import React from "react";
import data from "../data/analyticsData.json";
import "./Analytics.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";


function Analytics() {
  const sessions = data.sessions;
  const tasks = data.tasks;

  const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0);
  const avgTime = sessions.length ? totalTime / sessions.length : 0;

  const completed = tasks.filter(t => t.status === "Completed").length;
  const active = tasks.filter(t => t.status !== "Completed").length;
  const completionRate = (completed / tasks.length) * 100;

  const totalEstimated = tasks.reduce((sum, t) => sum + t.estimatedDuration, 0);
  const totalActual = sessions.reduce((sum, s) => sum + s.duration, 0);
  const estimationBias = totalActual - totalEstimated;

  const chartData = sessions.map((s) => ({
    day: s.startTime.split(" ")[0],
    minutes: s.duration
  }));

  const taskData = [
    { name: "Completed", value: completed },
    { name: "Active", value: active }
  ];

  return (
    <div className="analytics-container">
      <h2>Study Intelligence</h2>
      <p className="subtitle">
        Deep insights into your learning patterns.
      </p>

      <div className="cards">
        <div className="card">
          <p>Estimation Bias</p>
          <h2>{estimationBias} minutes</h2>
          <span>On average, tasks take less time than predicted.</span>
        </div>

        <div className="card">
          <p>Focus Efficiency</p>
          <h2>{completionRate.toFixed(0)}%</h2>
          <span>Based on completion vs time spent.</span>
        </div>
      </div>

      <div className="insight">
        <h4>Adaptive Intelligence Insight</h4>
        <p>
          {completionRate > 70
            ? "Excellent Planning. Your schedule is well-optimized."
            : "You need to improve consistency."}
        </p>
      </div>

      <div className="bottom">
        <div className="chart-box">
          <h4>Weekly Study Volume</h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="minutes" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="task-box">
          <h4>Task Completion</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={taskData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;