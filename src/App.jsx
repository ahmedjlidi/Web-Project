import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Navigation from "./Navigation";
import React, { useState, useEffect } from "react";

function TasksPage() {
  return <h1>Tasks Page</h1>;
}

function Layout() {
  //const user = { name: "student", email: "student@example.com" };
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/profile")
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-page">
      <Navigation user={user} />
      <div className="dashboard-main">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Authentication state="login" />} />
        <Route path="/signup" element={<Authentication state="signup" />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;