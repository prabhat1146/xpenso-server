const asyncHandler = require("../../utility/asyncHandler");
const { AppDataSource } = require("../../db/sqldb");
const ApiResponse = require("../../utility/apiResponse");
const Logger = require("../../utility/logger");
const User = require("../../entities/User");
const hashUtils = require("../../utility/hashUtils");

const signUpUserController = asyncHandler(async (req, res, next) => {
  const userRepo = AppDataSource.getRepository(User);

  const {
    mobile,
    firstName,
    middleName,
    lastName,
    email,
    password,
  } = req.body;

  // Basic validation
  if (!mobile || !firstName || !lastName || !email || !password) {
    return ApiResponse.error(req,res,400,false, "All required fields must be provided");
  }

  // Check for existing user by mobile or email
  const existing = await userRepo.findOne({ where: [{ email }, { mobile }] });
  if (existing) {
    return ApiResponse.error(req,res,409,false,"User with given email or mobile already exists",);
  }

  // Hash password
  const passwordHash = await hashUtils.hashPassword(password);

  // Create and save user
  const user = userRepo.create({
    mobile,
    firstName,
    middleName,
    lastName,
    email,
    passwordHash,
  });

  await userRepo.save(user);

  ApiResponse.success(req,res, 201, true, "User created successfully", {
    mobile: user.mobile,
    firstName: user?.firstName,
    middleName: user?.middleName,
    lastName: user?.lastName,
    email: user?.email,
    createdAt: user.createdAt,
  });

  Logger.info(`[${new Date().toISOString()}] POST ${req?.originalUrl} - ${req.ip} - User ${email} created`);
});

module.exports = signUpUserController
