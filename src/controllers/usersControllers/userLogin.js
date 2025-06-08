const asyncHandler = require("../../utility/asyncHandler");
const { AppDataSource } = require("../../db/sqldb");
const ApiResponse = require("../../utility/apiResponse");
const ErrorHandler = require("../../utility/ErrorHandler");
const bcrypt = require("bcryptjs");
const { generateToken, generateRefreshToken } = require("../../utility/jwtUtil");
const User = require("../../entities/User");
const UserSession = require("../../entities/UserSession");
const Logger = require("../../utility/logger");
const hashUtils = require("../../utility/hashUtils");

const loginController = asyncHandler(async (req, res) => {
  const { mobile, password, deviceInfo } = req.body;

  if (!mobile || !password) {
   return ApiResponse.error(req,res,400,false,"Mobile and password are required",null);
  }

  const userRepo = AppDataSource.getRepository(User);
  const sessionRepo = AppDataSource.getRepository(UserSession);

  const user = await userRepo.findOneBy({ mobile });

  if (!user) {
     return ApiResponse.error(req,res,404,false,"User not found", null);
  }

  const isPasswordValid = await hashUtils.comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    return ApiResponse.error(req,res,401,false,"Invalid credentials", null);
  }

  const accessToken = await generateToken({ mobile: user.mobile });
  const refreshToken = await generateRefreshToken({ mobile: user.mobile });

  const session = sessionRepo.create({
    mobile: user.mobile,
    token: accessToken,
    refreshToken,
    deviceInfo: deviceInfo || req.headers["user-agent"],
    ipAddress: req.ip,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });

  await sessionRepo.save(session);

  ApiResponse.success(req,res, 200, true, "Login successful", {
    accessToken,
    refreshToken,
    user: {
      mobile: user.mobile,
      firstName: user.firstName,
      middleName: user?.middleName,
      lastName: user.lastName,
      email: user?.email,
    },
  });

  Logger.info(`[${new Date().toISOString()}] POST ${req?.originalUrl} - ${req.ip} - Login successful`);
});

module.exports = loginController;
