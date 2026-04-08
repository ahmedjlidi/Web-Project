import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignInUpForm from "./pages/SignInUp/SignInUp.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInUpForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;