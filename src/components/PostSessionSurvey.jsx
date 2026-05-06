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

    async function handleSubmit(e) {
        e.preventDefault();

        const numericProgressAfter = Number(progressAfter);

        if (
            Number.isNaN(numericProgressAfter) ||
            numericProgressAfter < 0 ||
            numericProgressAfter > 100
        ) {
            alert("Progress must be between 0 and 100");
            return;
        }

        const sessionData = {
            taskID,

            startTime,
            endTime,
            duration,

            progressBefore: Number(progressBefore),
            progressAfter: numericProgressAfter,

            focusRating: Number(focusRating),
            satisfactionRating: Number(satisfactionRating),
            interruptions: Number(interruptions)
        };

        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch("http://localhost:3501/api/sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(sessionData)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to save study session");
                return;
            }

            if (onSubmitSurvey) {
                onSubmitSurvey(data.session, data.task);
            }

        } catch (error) {
            console.error("Error saving study session:", error);
            alert("Server error");
        }
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