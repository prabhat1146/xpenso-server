const { AppDataSource } = require("../../db/sqldb");
const User = require("../../entities/User");
const ApiResponse = require("../../utility/apiResponse");
const asyncHandler = require("../../utility/asyncHandler");


const userVerifyMobileOTPController = asyncHandler(async (req, res) => {
  const { mobile, generatedOTP } = req.body;

  if (!mobile || !generatedOTP) {
    return ApiResponse.error(req, res, 400, false, "Mobile and OTP are required.");
  }

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { mobile } });

  if (!user) {
    return ApiResponse.error(req, res, 404, false, "User not found.");
  }

  if (user.mobileOTP !== generatedOTP) {
    return ApiResponse.error(req, res, 401, false, "Invalid OTP.");
  }

  user.isMobileVerified = true;
  user.mobileOTP = null; // Optional: clear OTP after verification
  await userRepo.save(user);

  return ApiResponse.success(req, res, 200, true, "Mobile verified successfully.");
});

module.exports=userVerifyMobileOTPController
