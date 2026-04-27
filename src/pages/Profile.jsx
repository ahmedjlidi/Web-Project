import React, { useState, useEffect } from "react";
import "../pages/Profile.css";

import PersonalInfo from "../components/PersonalInfo";
import StudyPreferences from "../components/StudyPreferences";
import Actions from "../components/Actions";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [sessionLength, setSessionLength] = useState(30);
  const [studyTime, setStudyTime] = useState(2);
  const [accuracy, setAccuracy] = useState(2);

  const [emailError, setEmailError] = useState("");

  // react asks backend for profile data and puts it in the input field
  useEffect(() => {
    fetch("http://localhost:5001/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setName(data.name || "");
          setEmail(data.email || "");
          setSessionLength(data.sessionLength || 30);
          setStudyTime(data.studyTime || 2);
          setAccuracy(data.accuracy || 2);
        }
      })
      .catch(err => console.error("Connection failed:", err));
  }, []);

  const handleSave = async () => {
    const data = { name, email, sessionLength, studyTime, accuracy };
    if (password) data.passwordHash = password;

    try {
      const res = await fetch("http://localhost:5001/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error(result);    
        alert("Save failed: " + result.error);
        return;
      }

      console.log("Saved:", result); 
      alert("Profile saved!");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Backend not running!");
    }
  };
  const handleCancel = () => {
    setName("");
    setEmail("");
    setPassword("");
    setSessionLength(30);
    setStudyTime(2);
    setAccuracy(2);
  };


  const handleUpdateEmail = async () => {
    if (!password) {
      setEmailError("Enter password first");
      return;
    }

  try {
    const res = await fetch("http://localhost:5001/profile/email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (!res.ok) {
      setEmailError(result.error);
      return;
    }

    alert("Email updated!");
    setEmailError("");
  } catch (err) {
    console.error(err);
    alert("Update failed!");
  }
};

  const getAccuracyLabel = () => {
    if (accuracy === 1) return "Low (I underestimate)";
    if (accuracy === 2) return "Medium";
    return "High (Very accurate)";
  };

  return (
    <div className="profile-container">
      <h2 className="title">Profile Settings</h2>

      <div className="profile-card">
        <PersonalInfo
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleUpdateEmail={handleUpdateEmail}
          emailError={emailError}
          setEmailError={setEmailError}
        />

        <StudyPreferences
          sessionLength={sessionLength}
          setSessionLength={setSessionLength}
          studyTime={studyTime}
          setStudyTime={setStudyTime}
          accuracy={accuracy}
          setAccuracy={setAccuracy}
          getAccuracyLabel={getAccuracyLabel}
        />

        <Actions
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}

export default Profile;