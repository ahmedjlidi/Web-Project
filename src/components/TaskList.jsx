import { useEffect, useState } from "react";
import Task from "./Task";
import "./TaskList.css";

function TaskList({ tasks, completedTasks, setTasks }) {
  const [hiddenTaskIds, setHiddenTaskIds] = useState(() => {
    const saved = localStorage.getItem("hiddenTaskIds");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("hiddenTaskIds", JSON.stringify(hiddenTaskIds));
  }, [hiddenTaskIds]);

  function isTaskOverdue(task) {
    if (!task.deadline) return false;

    const deadlineDate = new Date(task.deadline);
    const now = new Date();

    if (isNaN(deadlineDate.getTime())) return false;

    return now > deadlineDate && task.currentProgress < 100;
  }

  function isHidden(taskID) {
    return hiddenTaskIds.includes(taskID);
  }

  function hideTask(taskID) {
    setHiddenTaskIds((prev) => {
      if (prev.includes(taskID)) return prev;
      return [...prev, taskID];
    });
  }

  async function handleDone(taskID) {
    const allTasks = [...tasks, ...completedTasks];

    const selectedTask = allTasks.find((task) => task.taskID === taskID);

    if (!selectedTask) return;

    const isCompleted = selectedTask.currentProgress >= 100;

    /*
      If the task is already completed, pressing done hides it from the UI.
      This uses localStorage through hiddenTaskIds.
    */
    if (isCompleted) {
      hideTask(taskID);
      return;
    }

    /*
      If the task is active, pending, or overdue, pressing done marks it as completed.
      Overdue tasks are not hidden immediately. They move to Completed Tasks.
    */
    try {
      const res = await fetch(
        `http://localhost:3501/api/tasks/${taskID}/progress`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({ progress: 100 }),
        }
      );

      const updatedTask = await res.json();

      if (!res.ok) {
        alert(updatedTask.message || "Failed to update task");
        return;
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.taskID === taskID
            ? {
              ...task,
              currentProgress: updatedTask.currentProgress,
              updatedAt: updatedTask.updatedAt,
              completedAt: updatedTask.completedAt,
            }
            : task
        )
      );
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  }


  function handleInfo(taskID) {
    console.log("Show info for task:", taskID);
  }

  const visibleActiveTasks = tasks.filter(
    (task) => !isTaskOverdue(task) && !isHidden(task.taskID)
  );

  const visibleOverdueTasks = tasks.filter(
    (task) => isTaskOverdue(task) && !isHidden(task.taskID)
  );

  const visibleCompletedTasks = completedTasks.filter(
    (task) => !isHidden(task.taskID)
  );

  return (
    <div className="task-list">
      {visibleActiveTasks.length > 0 && (
        <>
          <h2>Active Tasks</h2>

          <div className="task-list-grid">
            {visibleActiveTasks.map((task) => (
              <Task
                key={task.taskID}
                {...task}
                onDone={handleDone}
                onInfo={handleInfo}
                disableInfo={false}
              />
            ))}
          </div>
        </>
      )}

      {visibleOverdueTasks.length > 0 && (
        <>
          <h2>Overdue Tasks</h2>

          <div className="task-list-grid">
            {visibleOverdueTasks.map((task) => (
              <Task
                key={task.taskID}
                {...task}
                onDone={handleDone}
                onInfo={handleInfo}
                disableInfo={true}
              />
            ))}
          </div>
        </>
      )}

      {visibleCompletedTasks.length > 0 && (
        <>
          <h2>Completed Tasks</h2>

          <div className="task-list-grid">
            {visibleCompletedTasks.map((task) => (
              <Task
                key={task.taskID}
                {...task}
                onDone={handleDone}
                onInfo={handleInfo}
                disableInfo={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TaskList;