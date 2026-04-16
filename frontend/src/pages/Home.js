import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-badge">Task-Helper</div>
        <h1>Organize work with clear user and admin portals.</h1>

        {user ? (
          <div className="authenticated-content">
            <h2>Hello, {user.firstName}! 👋</h2>
            <p>You're logged in as: <strong>{user.email}</strong></p>
            <p>Role: <span className="role-badge">{user.role}</span></p>
            <button
              className="cta-btn"
              onClick={() =>
                navigate(
                  user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
                )
              }
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="unauthenticated-content">
            <p>Get started by logging in or creating an account</p>
            <div className="button-group">
              <button
                className="cta-btn primary large-nav-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="cta-btn secondary large-nav-btn"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
