import { useEffect, useState } from "react";
import "./NotificationBanner.css";

function formatMinutes(totalMinutes) {
  const minutes = Number(totalMinutes) || 0;

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
}

function NotificationBanner({ externalMessage }) {
  const [message, setMessage] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    async function checkStudyGoal() {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) return;

        const res = await fetch("http://localhost:3501/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile = await res.json();

        if (!res.ok) return;

        if (!profile || profile.averageDailyStudyTime === undefined) return;

        sessionStorage.setItem("profile", JSON.stringify(profile));

        /*
          If averageDailyStudyTime is already stored in minutes,
          do NOT multiply by 60.

          Example:
          120 means 120 minutes, not 120 hours.
        */
        const requiredMinutes = Number(profile.averageDailyStudyTime || 0);

        const user = JSON.parse(sessionStorage.getItem("user"));
        const studiedKey = `studiedToday_${user?.id}`;
        const studiedToday = Number(sessionStorage.getItem(studiedKey)) || 0;

        if (!externalMessage) {
          if (studiedToday < requiredMinutes) {
            const remaining = requiredMinutes - studiedToday;

            setMessage(
              `You studied ${formatMinutes(studiedToday)} today. Goal: ${formatMinutes(requiredMinutes)}. ${formatMinutes(remaining)} remaining.`
            );
          } else {
            setMessage("");
          }
        }
      } catch (err) {
        console.error("Notification error:", err);
      }
    }

    checkStudyGoal();
    setHidden(false);
  }, [externalMessage]);

  const finalMessage = hidden ? "" : externalMessage || message;

  if (!finalMessage) return null;

  const isWarning = Boolean(externalMessage);

  return (
    <div className={`notification-banner ${isWarning ? "warning" : "goal"}`}>
      <div className="notification-content">
        <div className="notification-icon">
          {isWarning ? "!" : "✓"}
        </div>

        <span>{finalMessage}</span>
      </div>

      <button
        className="notification-close"
        onClick={() => setHidden(true)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default NotificationBanner;