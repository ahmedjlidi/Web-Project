/*import SignInUpForm from './SignInUp'

function App() {
  return (

    <SignInUpForm />

  )
}

export default App
*/

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignInUp from "./SignInUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInUp />} />
        <Route path="/signup" element={<SignInUp />} />
      </Routes>
    </Router>
  );
}

export default App;