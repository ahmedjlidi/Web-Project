import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostSessionSurvey from "../components/PostSessionSurvey";
import { useTasks } from "../components/TaskContext";
import "./FocusSession.css";

function FocusSession() {
    const { taskID } = useParams();
    const navigate = useNavigate();
    const { tasks, setTasks } = useTasks();

    const selectedTask = tasks.find(
        (task) => task.taskID === taskID
    );

    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [showSurvey, setShowSurvey] = useState(false);

    const progressBefore = selectedTask ? selectedTask.currentProgress : 0;

    useEffect(() => {
        let timerID;

        if (isRunning) {
            timerID = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timerID);
        };
    }, [isRunning]);

    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        return (
            String(hours).padStart(2, "0") +
            ":" +
            String(minutes).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0")
        );
    }

    function handleStart() {
        setStartTime(new Date().toISOString());
        setIsRunning(true);
    }

    function handleEnd() {
        setIsRunning(false);
        setEndTime(new Date().toISOString());
        setShowSurvey(true);
    }

    function handleCancel() {
        navigate("/dashboard");
    }

async function handleSubmitSurvey(sessionData) {
  try {
    const res = await fetch(
      `http://localhost:5001/api/tasks/${taskID}/progress`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          progress: sessionData.progressAfter,
        }),
      }
    );

    const updatedTask = await res.json();

    if (!res.ok) {
      alert(updatedTask.message || "Failed to save progress");
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

    navigate("/dashboard");
   const user = JSON.parse(sessionStorage.getItem("user"));
const today = new Date().toISOString().split("T")[0];

const studiedKey = `studiedToday:${user.id}:${today}`;

const oldStudiedToday =
  Number(sessionStorage.getItem(studiedKey)) || 0;

const newStudiedToday = oldStudiedToday + sessionData.duration;

sessionStorage.setItem(studiedKey, newStudiedToday);

navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}

    function handlePause() {
        setIsRunning(false);
    }

    function handleResume() {
        setIsRunning(true);
    }

    if (!selectedTask) {
        return (
            <div className="focus-session-page">
                <h2>Task not found</h2>
                <button onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    if (showSurvey) {
        return (
            <div className="focus-session-page">
                <div className="focus-session-content">
                    <PostSessionSurvey
                        taskID={taskID}
                        userID={selectedTask.userID}
                        startTime={startTime}
                        endTime={endTime}
                        duration={Math.ceil(seconds / 60)}
                        progressBefore={progressBefore}
                        onSubmitSurvey={handleSubmitSurvey}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="focus-session-page">
            <div className="focus-session-header">
                <button className="focus-back-button" onClick={handleCancel}>
                    Back
                </button>

                <p className="focus-task-id">
                    {selectedTask.title}
                </p>
            </div>

            <div className="focus-session-content">
                <h1>Focus Session</h1>

                <div className="focus-timer">
                    {formatTime(seconds)}
                </div>

                <div className="focus-actions">
                    <button
                        className="focus-start-button"
                        onClick={handleStart}
                        disabled={isRunning || seconds > 0}
                    >
                        Start
                    </button>

                    {isRunning ? (
                        <button
                            className="focus-pause-button"
                            onClick={handlePause}
                        >
                            Pause
                        </button>
                    ) : (
                        seconds > 0 && (
                            <button
                                className="focus-resume-button"
                                onClick={handleResume}
                            >
                                Resume
                            </button>
                        )
                    )}

                    <button
                        className="focus-end-button"
                        onClick={handleEnd}
                        disabled={seconds === 0}
                    >
                        End Session
                    </button>
                </div>
                {/*
                <div className="focus-actions">
                    <button
                        className="focus-start-button"
                        onClick={handleStart}
                        disabled={isRunning}
                    >
                        Start
                    </button>

                    <button
                        className="focus-end-button"
                        onClick={handleEnd}
                        disabled={seconds === 0}
                    >
                        End Session
                    </button>
                </div>
                */}
            </div>
        </div>
    );
}

export default FocusSession;