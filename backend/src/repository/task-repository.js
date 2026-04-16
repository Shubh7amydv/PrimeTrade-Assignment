const CrudRepository = require("./crud-repository");
const { Task } = require("../models/index");

class TaskRepository extends CrudRepository {
  constructor() {
    super(Task);
  }

  async createTask(data) {
    try {
      const task = await Task.create(data);
      return task;
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(taskId) {
    try {
      const task = await Task.findById(taskId);
      return task;
    } catch (error) {
      throw error;
    }
  }

  async getTasksByUserId(userId) {
    try {
      const tasks = await Task.find({ userId });
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(taskId, data) {
    try {
      const task = await this.update(taskId, data);
      return task;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      const result = await this.destroy(taskId);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllTasks(filter = {}) {
    try {
      const tasks = await Task.find(filter);
      return tasks;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskRepository;
