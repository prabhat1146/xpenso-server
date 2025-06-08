const Logger = require("./logger");

class ApiResponse {
  constructor(statusCode, success, message, data = null) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }

  static success(req,res, statusCode = 200, success = true, message = "Success", data = null) {
    Logger.info(`[${new Date().toISOString()}] POST ${req?.originalUrl} - ${req.ip} - ${message}`);
    return new ApiResponse(statusCode, success, message, data).send(res);
  }

  static error(req,res, statusCode = 500, success = false, message = "Something went wrong", data = null) {
    Logger.error(`[${new Date().toISOString()}] POST ${req?.originalUrl} - ${req.ip} - ${message}`);
    return new ApiResponse(statusCode, success, message, data).send(res);
  }
}

module.exports = ApiResponse;
