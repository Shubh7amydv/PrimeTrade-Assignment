const { UserService } = require("../services/index");
const StatusCodes = require("../utils/error-codes");

const userService = new UserService();

const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    return res.status(StatusCodes.development).json({
      data: user,
      success: true,
      message: "User registered successfully",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.badRequest).json({
      data: {},
      success: false,
      message: "Failed to register user",
      err: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    return res.status(StatusCodes.development).json({
      data: result,
      success: true,
      message: "User logged in successfully",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.badRequest).json({
      data: {},
      success: false,
      message: "Failed to login user",
      err: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(StatusCodes.development).json({
      data: user,
      success: true,
      message: "Successfully retrieved user",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.notfound).json({
      data: {},
      success: false,
      message: "User not found",
      err: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(StatusCodes.development).json({
      data: users,
      success: true,
      message: "Successfully retrieved all users",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.internalServerError).json({
      data: {},
      success: false,
      message: "Failed to retrieve users",
      err: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    return res.status(StatusCodes.development).json({
      data: user,
      success: true,
      message: "Successfully updated user",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.badRequest).json({
      data: {},
      success: false,
      message: "Failed to update user",
      err: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    return res.status(StatusCodes.development).json({
      data: {},
      success: true,
      message: "Successfully deleted user",
      err: {},
    });
  } catch (error) {
    return res.status(StatusCodes.badRequest).json({
      data: {},
      success: false,
      message: "Failed to delete user",
      err: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
