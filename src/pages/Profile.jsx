import React, { useState, useEffect } from "react";
import "./Profile.css";
import { User } from "lucide-react";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [sessionLength, setSessionLength] = useState(30);
  const [studyTime, setStudyTime] = useState(2);
  const [accuracy, setAccuracy] = useState(2);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));

    if (saved) {
      setName(saved.name || "");
      setEmail(saved.email || "");
      setSessionLength(saved.sessionLength || 30);
      setStudyTime(saved.studyTime || 2);
      setAccuracy(saved.accuracy || 2);
    }
  }, []);

  const handleSave = () => {
    const data = {
      name,
      email,
      sessionLength,
      studyTime,
      accuracy,
    };

    localStorage.setItem("profile", JSON.stringify(data));
    alert("Profile saved!");
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setPassword("");
    setSessionLength(30);
    setStudyTime(2);
    setAccuracy(2);
  };

  const handleUpdateEmail = () => {
    if (!password) {
      alert("Enter password to update email");
      return;
    }
    alert("Email updated!");
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
        <div className="section">
          <h3>Personal Info</h3>

          <div className="personal-row">
            <div className="left">
              <div className="avatar">
                <User size={40} />
              </div>
              <button className="btn primary">Change</button>
              <button className="btn">Remove</button>
            </div>

            <div className="right">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="email-row">
                <div className="form-group email-input">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  className="btn primary update-btn"
                  onClick={handleUpdateEmail}
                >
                  Update Email
                </button>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!password && (
                  <p className="error">
                    You need to enter your password to change your email.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Study Preferences</h3>

          <div className="form-group">
            <label>
              Session Length: {sessionLength} min (
              {(sessionLength / 60).toFixed(1)} hrs)
            </label>
            <input
              type="range"
              min="5"
              max="180"
              step="5"
              value={sessionLength}
              onChange={(e) => setSessionLength(Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="form-group">
            <label>Daily Study Time: {studyTime} hours</label>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={studyTime}
              onChange={(e) => setStudyTime(Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="form-group">
            <label>
              Time Estimation Accuracy: {getAccuracyLabel()}
            </label>
            <input
              type="range"
              min="1"
              max="3"
              step="1"
              value={accuracy}
              onChange={(e) => setAccuracy(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>

        <div className="actions">
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;