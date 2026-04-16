const { TaskService } = require("../services/index");
const StatusCodes = require("../utils/error-codes");

const taskService = new TaskService();

const isOwner = (task, userId) => task.userId.toString() === userId.toString();

const createTask = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      userId: req.user.role === "admin" ? req.body.userId || req.user.id : req.user.id,
    };

    const task = await taskService.createTask(payload);
    return res.status(StatusCodes.development).json({
      data: task,
      success: true,
      message: "Task created successfully",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.badRequest).json({
      data: {},
      success: false,
      message: "Failed to create task",
      err: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    if (req.user.role !== "admin" && !isOwner(task, req.user.id)) {
      return res.status(StatusCodes.forbidden).json({
        data: {},
        success: false,
        message: "Access denied",
        err: "You can only view your own tasks",
      });
    }

    return res.status(StatusCodes.development).json({
      data: task,
      success: true,
      message: "Successfully retrieved task",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.notfound).json({
      data: {},
      success: false,
      message: "Task not found",
      err: error.message,
    });
  }
};

const getTasksByUserId = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.params.userId.toString() !== req.user.id.toString()) {
      return res.status(StatusCodes.forbidden).json({
        data: {},
        success: false,
        message: "Access denied",
        err: "You can only view your own tasks",
      });
    }

    const tasks = await taskService.getTasksByUserId(req.params.userId);
    return res.status(StatusCodes.development).json({
      data: tasks,
      success: true,
      message: "Successfully retrieved user tasks",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.internalServerError).json({
      data: {},
      success: false,
      message: "Failed to retrieve tasks",
      err: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const existingTask = await taskService.getTaskById(req.params.id);

    if (req.user.role !== "admin" && !isOwner(existingTask, req.user.id)) {
      return res.status(StatusCodes.forbidden).json({
        data: {},
        success: false,
        message: "Access denied",
        err: "You can only update your own tasks",
      });
    }

    const task = await taskService.updateTask(req.params.id, req.body);
    return res.status(StatusCodes.development).json({
      data: task,
      success: true,
      message: "Successfully updated task",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.badRequest).json({
      data: {},
      success: false,
      message: "Failed to update task",
      err: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const existingTask = await taskService.getTaskById(req.params.id);

    if (req.user.role !== "admin" && !isOwner(existingTask, req.user.id)) {
      return res.status(StatusCodes.forbidden).json({
        data: {},
        success: false,
        message: "Access denied",
        err: "You can only delete your own tasks",
      });
    }

    await taskService.deleteTask(req.params.id);
    return res.status(StatusCodes.development).json({
      data: {},
      success: true,
      message: "Successfully deleted task",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.badRequest).json({
      data: {},
      success: false,
      message: "Failed to delete task",
      err: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(StatusCodes.development).json({
      data: tasks,
      success: true,
      message: "Successfully retrieved all tasks",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.internalServerError).json({
      data: {},
      success: false,
      message: "Failed to retrieve tasks",
      err: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTaskById,
  getTasksByUserId,
  updateTask,
  deleteTask,
  getAllTasks,
};
