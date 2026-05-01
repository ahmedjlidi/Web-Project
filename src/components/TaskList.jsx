import Task from "./Task";
import "./TaskList.css";

function TaskList({ tasks, completedTasks, setTasks }) {
  async function handleDone(taskID) {
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

  return (
    <div className="task-list">
      <div className="task-list-grid">
        {tasks.map((task) => (
          <Task
            key={task.taskID}
            {...task}
            onDone={handleDone}
            onInfo={handleInfo}
          />
        ))}
      </div>

      {completedTasks.length > 0 && (
        <>
          <h2>Completed Tasks</h2>

          <div className="task-list-grid">
            {completedTasks.map((task) => (
              <Task
                key={task.taskID}
                {...task}
                onDone={handleDone}
                onInfo={handleInfo}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TaskList;