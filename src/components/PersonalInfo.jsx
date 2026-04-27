import React from "react";
import { User } from "lucide-react";

function PersonalInfo({
  name,
  email,
  avatar,
  setAvatar,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  passwordError,
  setPasswordError
}){
    const handleImageChange = (e) => {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAvatar(reader.result); // ase64 string
        };

        reader.readAsDataURL(file);
      }
    };

  return (
    <div className="section">
      <h3>Personal Info</h3>

      <div className="personal-row">
        <div className="left">
          <div className="avatar">
            {/*<User size={40} />*/}
              {avatar ? (
                <img src={avatar} alt="avatar" className="avatar-img" />
              ) : (
                <User size={40} />
              )}
              {/* hidden file input*/}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="avatarInput"
                onChange={handleImageChange}
              />
          </div>
          <button
            className="btn primary"
            onClick={() => document.getElementById("avatarInput").click()}
          >
            Change
          </button>
          <button
            className="btn"
            onClick={() => setAvatar("")}
          >
            Remove
          </button>
        </div>

        <div className="right">
          <div className="form-group">
            <label>Name</label>
            <p>{name}</p>
          </div>

                        <div className="form-group">
            <label>Email</label>
            <p>{email}</p>
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordError("");
              }}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError("");
              }}
            />
          </div>

          {passwordError && <p className="error">{passwordError}</p>}

        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;