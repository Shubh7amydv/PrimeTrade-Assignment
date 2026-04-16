import React, { useEffect, useState } from "react";
import { taskAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

export const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    userId: user?.id,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasksByUser(user.id);
      setTasks(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await taskAPI.updateTask(editingId, formData);
        alert("Task updated successfully!");
      } else {
        await taskAPI.createTask(formData);
        alert("Task created successfully!");
      }
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        userId: user?.id,
      });
      setEditingId(null);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      userId: user.id,
    });
    setEditingId(task.id);
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskAPI.deleteTask(taskId);
        alert("Task deleted successfully!");
        fetchTasks();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete task");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      userId: user?.id,
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>Welcome, {user?.firstName}! Manage your tasks efficiently.</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        className="add-task-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "+ Add New Task"}
      </button>

      {showForm && (
        <div className="task-form-container">
          <form onSubmit={handleSubmit} className="task-form">
            <h3>{editingId ? "Edit Task" : "Create New Task"}</h3>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingId ? "Update Task" : "Create Task"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tasks-section">
        <h2>Your Tasks ({tasks.length})</h2>
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Create your first task!</p>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <h4>{task.title}</h4>
                  <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
                {task.description && <p>{task.description}</p>}
                <div className="task-meta">
                  <span className={`status-badge status-${task.status}`}>
                    {task.status}
                  </span>
                  {task.dueDate && (
                    <span className="due-date">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
