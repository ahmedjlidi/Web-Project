import { useEffect, useState } from "react";
import "./NotificationBanner.css";

function NotificationBanner() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkStudyGoal() {
      try {
        const res = await fetch("http://localhost:5001/profile");
        const profile = await res.json();

        if (!profile || !profile.studyTime) return;

        localStorage.setItem("profile", JSON.stringify(profile));

        const requiredMinutes = Number(profile.studyTime) * 60;
        const studiedToday = Number(localStorage.getItem("studiedToday")) || 0;

        if (studiedToday < requiredMinutes) {
          setMessage(
            `You studied ${studiedToday} minutes today. Your goal is ${requiredMinutes} minutes. Keep going!`
          );
        } else {
          setMessage("");
        }
      } catch (err) {
        console.error("Notification error:", err);
      }
    }

    checkStudyGoal();
  }, []);

  if (!message) return null;

  return (
    <div className="notification-banner">
      <span>{message}</span>
      <button onClick={() => setMessage("")}>×</button>
    </div>
  );
}

export default NotificationBanner;