import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAPI, taskAPI } from "../utils/api";
import "../styles/Dashboard.css";

export const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [usersRes, tasksRes] = await Promise.all([
        userAPI.getAllUsers(),
        taskAPI.getAllTasks(),
      ]);
      setUsersCount(usersRes.data.data.length || 0);
      setTasksCount(tasksRes.data.data.length || 0);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of users and tasks across the platform.</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{loading ? "..." : usersCount}</p>
        </div>
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{loading ? "..." : tasksCount}</p>
        </div>
      </div>

      <div className="admin-links">
        <Link to="/admin/users" className="admin-link-card">
          <h3>User Management</h3>
          <p>View and delete users.</p>
        </Link>
        <Link to="/admin/tasks" className="admin-link-card">
          <h3>Task Management</h3>
          <p>View all tasks across users.</p>
        </Link>
      </div>
    </div>
  );
};
