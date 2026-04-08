import "./Home.css";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
            <img src={logo} alt="logo" className="logo-img" />
            <span>StudyBuddy</span>
        </div>

        <div className="nav-links">
          <Link to="/signin" className="signin">Sign In</Link>
          <Link to="/signup" className="register">Register</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="badge">
          <span className="dot"></span>
          Adaptive Learning Intelligence
        </div>

        <h1>
          Master your studies with <br />
          <span className="highlight">predictive focus.</span>
        </h1>

        <p>
          StudyBuddy tracks your sessions, analyzes your estimation bias,
          and helps you build unbreakable focus habits.
        </p>

        <div className="buttons">
          <Link to="/signup" className="primary-btn">
            Get Started for Free →
          </Link>

          <Link to="/signin" className="secondary-btn">
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;