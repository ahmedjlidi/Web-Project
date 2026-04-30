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
  const [accuracy, setAccuracy] = useState(2);

  //const [emailError, setEmailError] = useState("");

  const [avatar, setAvatar] = useState("");

  // react asks backend for profile data and puts it in the input field
useEffect(() => {
  const token = sessionStorage.getItem("token");

  if (!token) return;

  fetch("http://localhost:5001/api/profile/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
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

  /*
  const handleSave = async () => {
    const data = { name, email, sessionLength, studyTime, accuracy, avatar };
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

      setUser(result);

      alert("Profile saved!");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Backend not running!");
    }
  };
  */

  const handleSave = async () => {
    if (newPassword || confirmPassword) {
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

    const data = { username: name, email, preferredSessionLength: sessionLength, averageDailyStudyTime: studyTime, accuracy, avatar };

    if (newPassword) {
      data.password = newPassword;
    }

    try {
      const res = await fetch("http://localhost:5001/api/profile/me", {
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

    } catch {
      alert("Backend not running!");
    }
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setSessionLength(30);
    setStudyTime(2);
    setAccuracy(2);

    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");

  };

  /*
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
  
      alert("Email updated!");
      setEmailError("");
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };
  */


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