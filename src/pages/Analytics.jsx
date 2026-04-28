import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

import { useTasks } from "../components/TaskContext";
import "./Analytics.css";

function Analytics() {
  const { tasks } = useTasks();

  /*
      Temporary mock sessions.
      Later, sessions should come from context or database.

      Each session belongs to one task using taskID.
  */
  const sessions = [
    {
      sessionID: 201,
      taskID: 101,
      userID: 1,
      startTime: "2026-03-02T18:00:00",
      endTime: "2026-03-02T18:45:00",
      duration: 45,
      progressBefore: 0,
      progressAfter: 30,
      focusRating: 4,
      satisfactionRating: 3,
      interruptions: 1,
      createdAt: "2026-03-02T18:45:00"
    },
    {
      sessionID: 202,
      taskID: 101,
      userID: 1,
      startTime: "2026-03-03T16:00:00",
      endTime: "2026-03-03T16:30:00",
      duration: 30,
      progressBefore: 30,
      progressAfter: 100,
      focusRating: 5,
      satisfactionRating: 4,
      interruptions: 0,
      createdAt: "2026-03-03T16:30:00"
    },
    {
      sessionID: 203,
      taskID: 102,
      userID: 1,
      startTime: "2026-03-04T19:00:00",
      endTime: "2026-03-04T19:50:00",
      duration: 50,
      progressBefore: 0,
      progressAfter: 40,
      focusRating: 3,
      satisfactionRating: 3,
      interruptions: 2,
      createdAt: "2026-03-04T19:50:00"
    }
  ];

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.currentProgress >= 100
  );

  const activeTasks = tasks.filter(
    (task) => task.currentProgress > 0 && task.currentProgress < 100
  );

  const notStartedTasks = tasks.filter(
    (task) => task.currentProgress === 0
  );

  const overdueTasks = tasks.filter((task) => {
    const deadline = new Date(task.deadline);
    const now = new Date();

    return deadline < now && task.currentProgress < 100;
  });

  const totalStudyTime = sessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );

  const averageFocus =
    sessions.length === 0
      ? 0
      : (
        sessions.reduce((sum, session) => sum + session.focusRating, 0) /
        sessions.length
      ).toFixed(1);

  function getActualDurationForTask(taskID) {
    return sessions
      .filter((session) => session.taskID === taskID)
      .reduce((sum, session) => sum + session.duration, 0);
  }

  const completedTasksWithActualTime = completedTasks.map((task) => {
    const actualDuration = getActualDurationForTask(task.taskID);

    return {
      taskName: task.title,
      estimated: task.estimatedDuration,
      actual: actualDuration,
      bias: actualDuration - task.estimatedDuration
    };
  });

  const estimationBias =
    completedTasksWithActualTime.length === 0
      ? 0
      : Math.round(
        completedTasksWithActualTime.reduce(
          (sum, task) => sum + task.bias,
          0
        ) / completedTasksWithActualTime.length
      );

  const taskStatusData = [
    { status: "Completed", count: completedTasks.length },
    { status: "Active", count: activeTasks.length },
    { status: "Not Started", count: notStartedTasks.length },
    { status: "Overdue", count: overdueTasks.length }
  ];

  const weeklyStudyMap = {};

  sessions.forEach((session) => {
    const date = session.startTime.split("T")[0];

    if (weeklyStudyMap[date]) {
      weeklyStudyMap[date] += session.duration;
    } else {
      weeklyStudyMap[date] = session.duration;
    }
  });

  const weeklyStudyData = Object.keys(weeklyStudyMap).map((date) => ({
    date,
    minutes: weeklyStudyMap[date]
  }));

  const estimatedVsActualData = completedTasksWithActualTime.map((task) => ({
    taskName: task.taskName,
    estimated: task.estimated,
    actual: task.actual
  }));

  const categoryMap = {};

  tasks.forEach((task) => {
    if (categoryMap[task.category]) {
      categoryMap[task.category] += 1;
    } else {
      categoryMap[task.category] = 1;
    }
  });

  const categoryData = Object.keys(categoryMap).map((category) => ({
    category,
    count: categoryMap[category]
  }));

  return (
    <div className="analytics-page">
      <h1>Analytics</h1>

      <div className="analytics-grid">
        <div className="analytics-card">
          <p>Total Tasks</p>
          <h2>{totalTasks}</h2>
        </div>

        <div className="analytics-card">
          <p>Completed Tasks</p>
          <h2>{completedTasks.length}</h2>
        </div>

        <div className="analytics-card">
          <p>Active Tasks</p>
          <h2>{activeTasks.length}</h2>
        </div>

        <div className="analytics-card">
          <p>Total Study Time</p>
          <h2>{totalStudyTime} min</h2>
        </div>

        <div className="analytics-card">
          <p>Average Focus</p>
          <h2>{averageFocus}/5</h2>
        </div>

        <div className="analytics-card">
          <p>Estimation Bias</p>
          <h2>{estimationBias} min</h2>
        </div>
      </div>

      <div className="analytics-section">
        <h2>Task Status Distribution</h2>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={taskStatusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-section">
        <h2>Weekly Study Volume</h2>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={weeklyStudyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="minutes"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-section">
        <h2>Estimated vs Actual Time</h2>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={estimatedVsActualData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="taskName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="estimated" name="Estimated Time" fill="#60a5fa"/>
            <Bar dataKey="actual" name="Actual Time" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-section">
        <h2>Tasks by Category</h2>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;