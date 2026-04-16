const { TaskRepository } = require("../repository/index");

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(data) {
    try {
      const { title, description, priority, dueDate, userId } = data;

      if (!title || !userId) {
        throw new Error("Title and userId are required");
      }

      const task = await this.taskRepository.createTask({
        title,
        description,
        priority,
        dueDate,
        userId,
      });

      return task;
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(taskId) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      return task;
    } catch (error) {
      throw error;
    }
  }

  async getTasksByUserId(userId) {
    try {
      const tasks = await this.taskRepository.getTasksByUserId(userId);
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(taskId, data) {
    try {
      const task = await this.taskRepository.updateTask(taskId, data);
      return task;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      const result = await this.taskRepository.deleteTask(taskId);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllTasks(filter = {}) {
    try {
      const tasks = await this.taskRepository.getAllTasks(filter);
      return tasks;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskService;
