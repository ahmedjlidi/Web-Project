import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Authentication state="login" />} />
        <Route path="/signup" element={<Authentication state="signup" />} />
      </Routes>
    </Router>
  );
}

export default App