import React, { useState, useEffect } from "react";
import "../pages/Profile.css";

import PersonalInfo from "../components/PersonalInfo";
import StudyPreferences from "../components/StudyPreferences";
import Actions from "../components/Actions";


function Profile({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [sessionLength, setSessionLength] = useState(30);
  const [studyTime, setStudyTime] = useState(2);
  const [accuracy, setAccuracy] = useState(80);

  const [successMessage, setSuccessMessage] = useState("");

  //const [emailError, setEmailError] = useState("");

  const [avatar, setAvatar] = useState("");

  // react asks backend for profile data and puts it in the input field
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    // send get request including the authorization header so backend knows which user logged in
    fetch("http://localhost:3501/api/profile/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())    // returns profile data
      .then((data) => {
        setName(data.username || "");
        setEmail(data.email || "");
        setSessionLength(data.preferredSessionLength || 30);
        setStudyTime(data.averageDailyStudyTime || 2);
        setAccuracy(data.accuracy || 0);
        setAvatar(data.avatar || "");
      })
      .catch((err) => console.error("Connection failed:", err));
  }, []);

  const handleSave = async () => {
    if (newPassword || confirmPassword) {
      // check if new password:
      // has at least 8 characters
      // has at least 1 capital letter
      // has at least 1 number
      const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

      if (!PASSWORD_REGEX.test(newPassword)) {
        setPasswordError(
          "Password must be at least 8 characters, include a capital letter and a number"
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
    }

    // object is sent to backend
    const data = { username: name, email, preferredSessionLength: sessionLength, averageDailyStudyTime: studyTime, accuracy, avatar };

    // sends new password to backend
    if (newPassword) {
      data.password = newPassword;
    }
    // object is sent to backend
    try {
      const res = await fetch("http://localhost:3501/api/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert("Save failed");
        return;
      }

      setUser(result);
      //alert("Profile saved!");

      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");

      if (newPassword) {
        setSuccessMessage("Profile and password updated successfully!");
      } else {
        setSuccessMessage("Profile updated successfully!");
      }

      setTimeout(() => setSuccessMessage(""), 3000);

    } catch {
      alert("Backend not running!");
    }
  };

  const handleCancel = () => {

    setNewPassword("");
    setConfirmPassword("");

  };

  const getAccuracyLabel = () => {
    if (accuracy === 1) return "Low (I underestimate)";
    if (accuracy === 2) return "Medium";
    return "High (Very accurate)";
  };

  return (
    <div className="profile-container">
      <h2 className="title">Profile Settings</h2>

      {successMessage && (
        <div className="success-toast">
          <div className="success-toast-icon">✓</div>

          <div>
            <h4>Saved successfully</h4>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      <div className="profile-card">
        <PersonalInfo
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          passwordError={passwordError}
          avatar={avatar}
          setAvatar={setAvatar}
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