const asyncHandler = require("../../utility/asyncHandler");
const { AppDataSource } = require("../../db/sqldb");
const ApiResponse = require("../../utility/apiResponse");
const ErrorHandler = require("../../utility/ErrorHandler");
const bcrypt = require("bcryptjs");
const {
  generateToken,
  generateRefreshToken,
} = require("../../utility/jwtUtil");
const User = require("../../entities/User");
const UserSession = require("../../entities/UserSession");
const Logger = require("../../utility/logger");
const hashUtils = require("../../utility/hashUtils");

const loginController = asyncHandler(async (req, res) => {
  const { mobile, email, password, deviceInfo } = req.body;

  if (!mobile && !email) {
    return ApiResponse.error(
      req,
      res,
      400,
      false,
      "Mobile or email is required",
      null
    );
  }
  if (!password) {
    return ApiResponse.error(
      req,
      res,
      400,
      false,
      "password is required",
      null
    );
  }

  const userRepo = AppDataSource.getRepository(User);
  const sessionRepo = AppDataSource.getRepository(UserSession);
  let isMobile = true;

  let user;

  if (mobile) {
    user = await userRepo.findOne({ where: { mobile } });
  }

  if (!user && email) {
    user = await userRepo.findOne({ where: { email } });
    isMobile = false;
  }

  console.log(user)

  if (!user) {
    return ApiResponse.error(req, res, 404, false, "User not found", null);
  }

  if (isMobile && !user.isMobileVerified) {
    return ApiResponse.error(
      req,
      res,
      401,
      false,
      "Mobile is not verified.",
      null
    );
  }
  if (!isMobile && !user.isEmailVerified) {
    return ApiResponse.error(
      req,
      res,
      401,
      false,
      "Email is not verified.",
      null
    );
  }

  const isPasswordValid = await hashUtils.comparePassword(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return ApiResponse.error(req, res, 401, false, "Invalid credentials", null);
  }

  if (user?.status.toLowerCase() === "Inactive".toLowerCase()) {
    ApiResponse.error(req, res, 403, true, "Your account has been blocked.");
    return;
  }

  const accessToken = await generateToken({ mobile: user.mobile });
  const refreshToken = await generateRefreshToken({ mobile: user.mobile });

  const session = sessionRepo.create({
    id:user.id,
    mobile: user.mobile,
    email:user.email,
    accessToken,
    refreshToken,
    deviceInfo: deviceInfo || req.headers["user-agent"],
    ipAddress: req.ip,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });

  await sessionRepo.save(session);

  ApiResponse.success(req, res, 200, true, "Login successful", {
    accessToken,
    refreshToken,
    user: {
      mobile: user.mobile,
      firstName: user.firstName,
      middleName: user?.middleName,
      lastName: user.lastName,
      email: user?.email,
      status: user.status,
      joinedAt: user.createdAt,
    },
  });

  Logger.info(
    `[${new Date().toISOString()}] POST ${req?.originalUrl} - ${
      req.ip
    } - Login successful`
  );
});

module.exports = loginController;
