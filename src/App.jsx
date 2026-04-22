import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  function handleLogin(userData) {
    setCurrentUser(userData);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD

        <Route
          path="/signin"
          element={<Authentication state="login" onLogin={handleLogin} />}
        />

        <Route
          path="/signup"
          element={<Authentication state="signup" onLogin={handleLogin} />}
        />

        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <Dashboard user={currentUser} tasks={[]} addTask={() => {}} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            currentUser ? (
              <Profile user={currentUser} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        <Route
          path="/analytics"
          element={
            currentUser ? (
              <Analytics user={currentUser} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
=======
        <Route path="/signin" element={<Authentication _state="login" />} />
        <Route path="/signup" element={<Authentication _state="signup" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> f4f3949235a2087fb0926a908adbbccd854c94b9
      </Routes>
    </Router>
  );
}

export default App;