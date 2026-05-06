import { useEffect, useState } from "react";

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
    Temporary user preferences.
    Later, these should come from the logged-in user profile.
  */
  const userPreferences = {
    preferredSessionLength: 45,
    averageDailyStudyTime: 120,
    accuracy: 80
  };

  /*
    Temporary mock sessions.
    Later, sessions should come from context or database.
  */
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:3501/api/sessions", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          console.log("Sessions error:", data.message);
          return [];
        }

        return data;
      })
      .then((data) => {
        const mappedSessions = data.map((session) => ({
          sessionID: session._id,

          /*
            Because backend uses populate("taskID", ...),
            taskID may be an object:
            {
              _id,
              title,
              category,
              estimatedDuration,
              deadline
            }
          */
          taskID:
            typeof session.taskID === "object"
              ? session.taskID._id
              : session.taskID,

          taskTitle:
            typeof session.taskID === "object"
              ? session.taskID.title
              : "Task",

          userID: session.userID,
          startTime: session.startTime,
          endTime: session.endTime,
          duration: Number(session.duration),

          progressBefore: Number(session.progressBefore),
          progressAfter: Number(session.progressAfter),

          focusRating: Number(session.focusRating),
          satisfactionRating: Number(session.satisfactionRating),
          interruptions: Number(session.interruptions),

          createdAt: session.createdAt
        }));

        setSessions(mappedSessions);
      })
      .catch((err) => console.log("Error loading sessions:", err));
  }, []);

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
      .filter((session) => String(session.taskID) === String(taskID))
      .reduce((sum, session) => sum + session.duration, 0);
  }

  const completedTasksWithActualTime = completedTasks.map((task) => {
    const actualDuration = getActualDurationForTask(task.taskID);

    return {
      taskName: task.title,
      estimated: task.estimatedDuration,
      actual: actualDuration,
      bias: actualDuration - task.estimatedDuration,
      absoluteError: Math.abs(actualDuration - task.estimatedDuration)
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

  const meanAbsoluteEstimationError =
    completedTasksWithActualTime.length === 0
      ? 0
      : Math.round(
        completedTasksWithActualTime.reduce(
          (sum, task) => sum + task.absoluteError,
          0
        ) / completedTasksWithActualTime.length
      );

  const measuredAccuracy =
    completedTasksWithActualTime.length === 0
      ? 0
      : Math.round(
        completedTasksWithActualTime.reduce((sum, task) => {
          if (!task.estimated || task.estimated <= 0) return sum;

          const errorRate =
            Math.abs(task.actual - task.estimated) / task.estimated;

          const taskAccuracy = Math.max(0, 100 - errorRate * 100);

          return sum + taskAccuracy;
        }, 0) / completedTasksWithActualTime.length
      );

  const averageSessionLength =
    sessions.length === 0
      ? 0
      : Math.round(totalStudyTime / sessions.length);

  const sessionLengthDifference =
    averageSessionLength - userPreferences.preferredSessionLength;

  const averageSessionDeviation =
    sessions.length === 0
      ? 0
      : Math.round(
        sessions.reduce(
          (sum, session) =>
            sum +
            Math.abs(session.duration - userPreferences.preferredSessionLength),
          0
        ) / sessions.length
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

  const weeklyStudyData = Object.keys(weeklyStudyMap).map((date) => {
    const actual = weeklyStudyMap[date];
    const goal = userPreferences.averageDailyStudyTime;

    return {
      date,
      actual,
      goal,
      goalCompletion:
        goal === 0 ? 0 : Math.round((actual / goal) * 100),
      gap: actual - goal
    };
  });

  const dailyGoalCompletion =
    weeklyStudyData.length === 0
      ? 0
      : Math.round(
        weeklyStudyData.reduce(
          (sum, day) => sum + day.goalCompletion,
          0
        ) / weeklyStudyData.length
      );

  const daysGoalMet = weeklyStudyData.filter(
    (day) => day.actual >= day.goal
  ).length;

  const estimatedVsActualData = completedTasksWithActualTime.map((task) => ({
    taskName: task.taskName,
    estimated: task.estimated,
    actual: task.actual
  }));

  const estimationErrorTrendData = completedTasksWithActualTime.map(
    (task, index) => ({
      taskName: task.taskName || `Task ${index + 1}`,
      bias: task.bias,
      absoluteError: task.absoluteError
    })
  );

  const sessionPreferenceData = sessions.map((session, index) => ({
    session: `S${index + 1}`,
    duration: session.duration,
    preferred: userPreferences.preferredSessionLength,
    difference: session.duration - userPreferences.preferredSessionLength
  }));

  const accuracyComparisonData = [
    {
      label: "Accuracy",
      selfRated: userPreferences.accuracy,
      measured: measuredAccuracy
    }
  ];

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

        <div className="analytics-card">
          <p>Mean Absolute Error</p>
          <h2>{meanAbsoluteEstimationError} min</h2>
        </div>

        <div className="analytics-card">
          <p>Measured Accuracy</p>
          <h2>{measuredAccuracy}%</h2>
        </div>

        <div className="analytics-card">
          <p>Self-Rated Accuracy</p>
          <h2>{userPreferences.accuracy}%</h2>
        </div>

        <div className="analytics-card">
          <p>Avg Session Length</p>
          <h2>{averageSessionLength} min</h2>
        </div>

        <div className="analytics-card">
          <p>Session Match</p>
          <h2>{sessionLengthDifference} min</h2>
        </div>

        <div className="analytics-card">
          <p>Daily Goal Progress</p>
          <h2>{dailyGoalCompletion}%</h2>
        </div>

        <div className="analytics-card">
          <p>Days Goal Met</p>
          <h2>{daysGoalMet}</h2>
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
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-section">
        <h2>Daily Study Goal vs Actual</h2>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={weeklyStudyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual Study Time"
              stroke="#2563eb"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="goal"
              name="Daily Goal"
              stroke="#ef4444"
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
            <Bar dataKey="estimated" name="Estimated Time" fill="#60a5fa" />
            <Bar dataKey="actual" name="Actual Time" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-section">
        <h2>Estimation Error Trend</h2>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={estimationErrorTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="taskName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="bias"
              name="Bias Actual - Estimated"
              stroke="#2563eb"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="absoluteError"
              name="Absolute Error"
              stroke="#f97316"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-section">
        <h2>Session Duration vs Preferred Length</h2>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={sessionPreferenceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="session" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="duration"
              name="Actual Session Duration"
              fill="#2563eb"
            />
            <Bar
              dataKey="preferred"
              name="Preferred Session Length"
              fill="#94a3b8"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-section">
        <h2>Self-Rated vs Measured Accuracy</h2>

        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={accuracyComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="selfRated"
              name="Self-Rated Accuracy"
              fill="#8b5cf6"
            />
            <Bar
              dataKey="measured"
              name="Measured Accuracy"
              fill="#10b981"
            />
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
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;