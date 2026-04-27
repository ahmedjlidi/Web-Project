import React from "react";
import { User } from "lucide-react";

function PersonalInfo({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  handleUpdateEmail,
  emailError,
  setEmailError,
}) {
  return (
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
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="email-row">
            <div className="form-group email-input">
              <label>Email</label>
              <input
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
              onChange={(e) => {
                setPassword(e.target.value);
                setEmailError(""); // clears error while typing
                }}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;