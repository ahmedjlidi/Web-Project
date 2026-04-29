import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Navigation from "./Navigation";
import React, { useEffect } from "react";
import FocusSession from "./pages/FocusSession";
import AdminPanel from "./AdminPanel/AdminPanel";

function TasksPage() {
  return <h1>Tasks Page</h1>;
}

function Layout() {
  const [user, setUser] = React.useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:5001/profile")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data))
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:5001/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("PROFILE:", data);
        setUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const isAdmin = user?.email?.endsWith("@admin.com");

  return (
    <div className="dashboard-page">
      <Navigation user={user} />

      <div className="dashboard-main">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile setUser={setUser} />} />
          <Route path="/focus-session/:taskID" element={<FocusSession />} />

          <Route
            path="/admin"
            element={
              isAdmin ? (
                <AdminPanel />
              ) : (
                <h2 style={{ padding: "20px" }}>Access Denied</h2>
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Authentication state="login" />} />
      <Route path="/signup" element={<Authentication state="signup" />} />
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}

export default App;