import { useState } from "react";
import "./PostSessionSurvey.css";

function formatDateTime(iso) {
    return new Date(iso).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function PostSessionSurvey({
    taskID,
    userID,
    startTime,
    endTime,
    duration,
    progressBefore,
    onSubmitSurvey,
    onCancel
}) {
    const [progressAfter, setProgressAfter] = useState(progressBefore);
    const [focusRating, setFocusRating] = useState(3);
    const [satisfactionRating, setSatisfactionRating] = useState(3);
    const [interruptions, setInterruptions] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();

        const sessionData = {
            sessionID: Date.now(),
            taskID: Number(taskID),
            userID: userID || 1,

            startTime,
            endTime,
            duration,

            progressBefore: Number(progressBefore),
            progressAfter: Number(progressAfter),

            focusRating: Number(focusRating),
            satisfactionRating: Number(satisfactionRating),
            interruptions: Number(interruptions),

            createdAt: new Date().toISOString()
        };

        /*
            FUTURE BACKEND / DATABASE TEMPLATE

            This is where the sessionData object should be saved
            to the StudySessions collection/table.

            Example using fetch:

            try {
                const response = await fetch("/api/study-sessions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(sessionData)
                });

                if (!response.ok) {
                    throw new Error("Failed to save study session");
                }

                const savedSession = await response.json();

                // Optional:
                // update task progress using progressAfter
                // update analytics
                // navigate back to dashboard

            } catch (error) {
                console.error("Error saving study session:", error);
            }

            Expected StudySession schema:

            {
                sessionID,
                taskID,
                userID,
                startTime,
                endTime,
                duration,
                progressBefore,
                progressAfter,
                focusRating,
                satisfactionRating,
                interruptions,
                createdAt
            }
        */

        onSubmitSurvey(sessionData);
    }

    return (
        <div className="survey-card">
            <h2>Session Review</h2>

            <p className="survey-description">
                Record how this focus session went.
            </p>

            <form onSubmit={handleSubmit} className="survey-form">
                <div className="survey-field">
                    <label htmlFor="progressAfter">Progress after session (%)</label>
                    <input
                        id="progressAfter"
                        type="number"
                        min="0"
                        max="100"
                        value={progressAfter}
                        onChange={(e) => setProgressAfter(e.target.value)}
                        required
                    />
                </div>

                <div className="survey-field">
                    <label htmlFor="focusRating">Focus rating</label>
                    <select
                        id="focusRating"
                        value={focusRating}
                        onChange={(e) => setFocusRating(e.target.value)}
                        required
                    >
                        <option value="1">1 - Very low</option>
                        <option value="2">2 - Low</option>
                        <option value="3">3 - Medium</option>
                        <option value="4">4 - High</option>
                        <option value="5">5 - Very high</option>
                    </select>
                </div>

                <div className="survey-field">
                    <label htmlFor="satisfactionRating">Satisfaction rating</label>
                    <select
                        id="satisfactionRating"
                        value={satisfactionRating}
                        onChange={(e) => setSatisfactionRating(e.target.value)}
                        required
                    >
                        <option value="1">1 - Very dissatisfied</option>
                        <option value="2">2 - Dissatisfied</option>
                        <option value="3">3 - Neutral</option>
                        <option value="4">4 - Satisfied</option>
                        <option value="5">5 - Very satisfied</option>
                    </select>
                </div>

                <div className="survey-field">
                    <label htmlFor="interruptions">Number of interruptions</label>
                    <input
                        id="interruptions"
                        type="number"
                        min="0"
                        value={interruptions}
                        onChange={(e) => setInterruptions(e.target.value)}
                        required
                    />
                </div>

                <div className="survey-summary">
                    <p>
                        <strong>Started:</strong> {formatDateTime(startTime)}
                    </p>
                    <p>
                        <strong>Ended:</strong> {formatDateTime(endTime)}
                    </p>
                    <p>
                        <strong>Duration:</strong> {duration} min
                    </p>
                    <p>
                        <strong>Progress before:</strong> {progressBefore}%
                    </p>
                </div>

                <div className="survey-actions">
                    <button type="button" className="survey-cancel" onClick={onCancel}>
                        Cancel
                    </button>

                    <button type="submit" className="survey-submit">
                        Save Session
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PostSessionSurvey;