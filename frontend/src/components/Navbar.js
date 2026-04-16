import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ✓ Task-Helper
        </Link>
        <div className="nav-menu">
          {user ? (
            <>
              <span className="user-info">
                Welcome, {user.firstName || user.email}
              </span>
              {user.role === "admin" ? (
                <>
                  <Link to="/admin/dashboard" className="nav-link">
                    Admin Dashboard
                  </Link>
                  <Link to="/admin/users" className="nav-link">
                    Users
                  </Link>
                  <Link to="/admin/tasks" className="nav-link">
                    Tasks
                  </Link>
                </>
              ) : (
                <Link to="/user/dashboard" className="nav-link">
                  User Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
                <Link to="/login" className="nav-link nav-auth-link">
                Login
              </Link>
                <Link to="/register" className="nav-link nav-auth-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
