import { Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css" 
function Navigation({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleSignOut() {
    navigate("/");
  }

  return (
    <div className="sidebar">
      <div>
        <h2 className="sidebar-logo">StudyBuddy</h2>

        <Nav className="flex-column sidebar-nav">
          <Nav.Link as={Link} to="/dashboard"
            className={location.pathname === "/dashboard" ? "sidebar-link active-link" : "sidebar-link"}>
            Dashboard
          </Nav.Link>

          <Nav.Link as={Link} to="/tasks"
            className={location.pathname === "/tasks" ? "sidebar-link active-link" : "sidebar-link"}>
            Tasks
          </Nav.Link>

          <Nav.Link as={Link} to="/analytics"
            className={location.pathname === "/analytics" ? "sidebar-link active-link" : "sidebar-link"}>
            Analytics
          </Nav.Link>

          <Nav.Link as={Link} to="/profile"
            className={location.pathname === "/profile" ? "sidebar-link active-link" : "sidebar-link"}>
            Profile
          </Nav.Link>
        </Nav>
      </div>
      <div className="sidebar-bottom">
        <div className="user-box">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
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