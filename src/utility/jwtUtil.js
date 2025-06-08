const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorHandler = require("../utility/ErrorHandler");
const { JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN,  } = require("../constants");
const Logger = require("./logger");

const JWT_SECRET = process.env.JWT_SECRET || "PRABHAT-KUMAR";

const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  } catch (err) {
    Logger.error("Error generating token:", err);
    throw new ErrorHandler(500,false,"Token generation failed",null);
  }
};

const generateRefreshToken = (payload, expiresIn = JWT_REFRESH_EXPIRES_IN) => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  } catch (err) {
    Logger.error("Error generating refresh token:", err);
    throw new ErrorHandler(500,false,"Refresh token generation failed",null);
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    Logger.error("Token verification failed:", err.message);
    // You can optionally re-throw custom errors here for centralized handling
    throw new ErrorHandler(500,false,"Invalid or expired token",null);
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
};
