import React from "react";
import "./Profile.css";
import { User } from "lucide-react";

function Profile() {
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
                <input type="text" placeholder="Enter your name" />
              </div>

              <div className="email-row">
                <div className="form-group email-input">
                  <label>Email</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
                <button className="btn primary update-btn">
                  Update Email
                </button>
              </div>

              <div className="form-group">
                <input type="password" placeholder="Confirm Password" />
                <p className="error">
                  You need to enter your password to change your email.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Study Preferences</h3>

          <div className="grid">
            <div className="form-group">
              <label>Preferred Session Length</label>
                <select defaultValue="">
                <option value="" disabled>
                    Choose session length
                </option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                </select>
            </div>

            <div className="form-group">
              <label>Average Daily Study Time</label>
                <select defaultValue="">
                <option value="" disabled>
                    Choose hours
                </option>
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4+ hours</option>
                </select>
            </div>

            <div className="form-group">
              <label>Time Estimation Accuracy</label>
                <select defaultValue="">
                <option value="" disabled>
                    Select accuracy
                </option>
                <option value="low">Low (I underestimate)</option>
                <option value="medium">Medium (sometimes accurate)</option>
                <option value="high">High (very accurate)</option>
                </select>
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="btn">Cancel</button>
          <button className="btn primary">Save</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;