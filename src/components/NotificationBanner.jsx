import { useEffect, useState } from "react";
import "./NotificationBanner.css";

function NotificationBanner() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkStudyGoal() {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) return;

        const res = await fetch("http://localhost:5001/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile = await res.json();

        if (!res.ok) return;

        if (!profile || profile.averageDailyStudyTime === undefined) return;
        sessionStorage.setItem("profile", JSON.stringify(profile));

        const requiredMinutes = Number(profile.averageDailyStudyTime || 2) * 60;
        const studiedToday =
          Number(sessionStorage.getItem("studiedToday")) || 0;

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