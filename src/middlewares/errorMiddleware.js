// middlewares/errorMiddleware.js
const ErrorHandler = require("../utility/ErrorHandler");
const Logger = require("../utility/logger");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const errorResponse = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
    errorResponse.path = req.originalUrl;
    errorResponse.method = req.method;
  }
Logger.error(`[${new Date().toISOString()}] POST ${req?.originalUrl} - ${req.ip} - ${errorResponse.message}`);
  res.status(statusCode).json(errorResponse);
};

module.exports = errorMiddleware;
