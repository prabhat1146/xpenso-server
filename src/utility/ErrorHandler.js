// utils/ErrorHandler.js
class ErrorHandler extends Error {
  constructor(statusCode, success, message, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;

    // Ensure stack trace is available
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
