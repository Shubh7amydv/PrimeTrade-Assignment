const { verifyToken } = require("../utils/jwt");
const StatusCodes = require("../utils/error-codes");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(StatusCodes.unAuthorizedRequest).json({
        data: {},
        success: false,
        message: "Authorization token is required",
        err: "No token provided",
      });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(StatusCodes.unAuthorizedRequest).json({
      data: {},
      success: false,
      message: "Invalid or expired token",
      err: error.message,
    });
  }
};

const authorize = (role) => {
  return (req, res, next) => {
    try {
      if (req.user.role !== role) {
        return res.status(StatusCodes.forbidden).json({
          data: {},
          success: false,
          message: `Access denied. Required role: ${role}`,
          err: "Insufficient permissions",
        });
      }
      next();
    } catch (error) {
      return res.status(StatusCodes.internalServerError).json({
        data: {},
        success: false,
        message: "Authorization error",
        err: error.message,
      });
    }
  };
};

module.exports = {
  auth,
  authorize,
};
