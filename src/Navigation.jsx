import { Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";

function Navigation({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.email?.endsWith("@admin.com");

  function handleSignOut() {
    navigate("/");
  }

  return (
    <div className="sidebar">
      <div>
        <h2 className="sidebar-logo">StudyBuddy</h2>

        <Nav className="flex-column sidebar-nav">
          <Nav.Link
            as={Link}
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "sidebar-link active-link" : "sidebar-link"}
          >
            Dashboard
          </Nav.Link>
          {/*
          <Nav.Link
            as={Link}
            to="/tasks"
            className={location.pathname === "/tasks" ? "sidebar-link active-link" : "sidebar-link"}
          >
            Tasks
          </Nav.Link>
          */}
          <Nav.Link
            as={Link}
            to="/analytics"
            className={location.pathname === "/analytics" ? "sidebar-link active-link" : "sidebar-link"}
          >
            Analytics
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/profile"
            className={location.pathname === "/profile" ? "sidebar-link active-link" : "sidebar-link"}
          >
            Profile
          </Nav.Link>

          {isAdmin && (
            <Nav.Link
              as={Link}
              to="/admin"
              className={location.pathname === "/admin" ? "sidebar-link active-link" : "sidebar-link"}
            >
              Admin
            </Nav.Link>
          )}
        </Nav>
      </div>

      <div className="sidebar-bottom">
        <div className="user-box">
          <div className="user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <p className="user-name">{user?.name || "User"}</p>
            <p className="user-email">{user?.email || "user@email.com"}</p>
          </div>
        </div>

        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Navigation;