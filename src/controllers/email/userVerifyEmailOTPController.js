const { AppDataSource } = require("../../db/sqldb");
const User = require("../../entities/User");
const ApiResponse = require("../../utility/apiResponse");
const asyncHandler = require("../../utility/asyncHandler");


const userVerifyEmailOTPController = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const generatedOTP=otp;

  // console.log(req.body)
  if (!email || !generatedOTP) {
    return ApiResponse.error(req, res, 400, false, "Email and OTP are required.");
  }

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { email } });

  if (!user) {
    return ApiResponse.error(req, res, 404, false, "User not found.");
  }

  if (user.emailOTP !== generatedOTP) {
    return ApiResponse.error(req, res, 401, false, "Invalid OTP.");
  }

  user.isEmailVerified = true;
  user.emailOTP = null; // Optional: clear OTP after verification
  await userRepo.save(user);

  return ApiResponse.success(req, res, 200, true, "Email verified successfully.");
});

module.exports=userVerifyEmailOTPController
