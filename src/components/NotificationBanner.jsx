import { useEffect, useState } from "react";
import "./NotificationBanner.css";

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

        const requiredMinutes = Number(profile.averageDailyStudyTime || 2) * 60;
        const user = JSON.parse(sessionStorage.getItem("user"));
        const studiedKey = `studiedToday_${user?.id}`;
        const studiedToday = Number(sessionStorage.getItem(studiedKey)) || 0;
        if(!externalMessage){
          if (studiedToday < requiredMinutes) {
            setMessage(
              `You studied ${studiedToday} minutes today. Your goal is ${requiredMinutes} minutes. Keep going!`
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


  //const finalMessage = externalMessage || message;
  //if (!message) return null;
  const finalMessage = hidden ? "" : (externalMessage || message);
  if (!finalMessage) return null;

  return (
    <div className="notification-banner">
      <span>{finalMessage}</span>
      <button onClick={() => setHidden(true)}>×</button>
    </div>
  );
}

export default NotificationBanner;