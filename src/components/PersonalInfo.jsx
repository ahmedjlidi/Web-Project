// import React from "react";
// import { User } from "lucide-react";
// import { EMAIL_REGEX } from '../components/validation'
// import { useEffect } from "react";

// function PersonalInfo({
//   name,
//   setName,
//   email,
//   setEmail,
//   password,
//   setPassword,
//   handleUpdateEmail,
//   emailError,
//   setEmailError,
//   avatar,
//   setAvatar
// }) {
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         setAvatar(reader.result); // ase64 string
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const validateEmail = (value) => {
//     if (value.trim().length === 0) {
//       return 'You cannot leave this field empty'
//     }

//     if (!EMAIL_REGEX.test(value)) {
//       return 'Please enter a valid email address.'
//     }

//     return ''
//   }
//   return (
//     <div className="section">
//       <h3>Personal Info</h3>

//       <div className="personal-row">
//         <div className="left">
//           <div className="avatar">
//             {/*<User size={40} />*/}
//             {avatar ? (
//               <img src={avatar} alt="avatar" className="avatar-img" />
//             ) : (
//               <User size={40} />
//             )}
//             {/* hidden file input*/}
//             <input
//               type="file"
//               accept="image/*"
//               style={{ display: "none" }}
//               id="avatarInput"
//               onChange={handleImageChange}
//             />
//           </div>
//           <button
//             className="btn primary"
//             onClick={() => document.getElementById("avatarInput").click()}
//           >
//             Change
//           </button>
//           <button
//             className="btn"
//             onClick={() => setAvatar("")}
//           >
//             Remove
//           </button>
//         </div>

//         <div className="right">
//           <div className="form-group">
//             <label>Name</label>
//             <input
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className="email-row">
//             <div className="form-group email-input">
//               <label>Email</label>
//               <input
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <button
//               className="btn primary update-btn"
//               onClick={handleUpdateEmail}
//             >
//               Update Email
//             </button>
//           </div>

//           <div className="form-group">
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setEmailError(""); // clears error while typing
//               }}
//             />
//             {emailError && <p className="error">{emailError}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PersonalInfo;

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
}) {
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

            <p className="static-field">{name}</p>
          </div>

          <div className="form-group">
            <label>Email</label>

            <p className="static-field">{email}</p>
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && <p className="error">{passwordError}</p>}
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