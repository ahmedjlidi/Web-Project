import Task from "./Task";
import "./TaskList.css";

function TaskList({ tasks, completedTasks, setTasks }) {
    function handleDone(taskID) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.taskID === taskID
                    ? { ...task, currentProgress: 100 }
                    : task
            )
        );
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