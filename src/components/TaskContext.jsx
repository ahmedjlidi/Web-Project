import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([
        {
            taskID: 101,
            userID: 1,
            title: "Web Project",
            estimatedDuration: 60,
            deadline: "Mar 2, 4:50 PM",
            difficulty: 3,
            priority: 2,
            category: "Project",
            notes: "Finish Task component styling",
            createdAt: "2026-03-28T10:00:00",
            updatedAt: "2026-03-29T14:00:00",
            currentProgress: 40
        },
        {
            taskID: 102,
            userID: 1,
            title: "Operating Systems",
            estimatedDuration: 90,
            deadline: "Mar 3, 8:00 PM",
            difficulty: 5,
            priority: 3,
            category: "Study",
            notes: "Review memory management slides",
            createdAt: "2026-03-28T11:00:00",
            updatedAt: "2026-03-29T15:00:00",
            currentProgress: 0
        }
    ]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}