const { AppDataSource } = require("../../db/sqldb");
const User = require("../../entities/User");
const ApiResponse = require("../../utility/apiResponse");
const asyncHandler = require("../../utility/asyncHandler");
const hashUtils = require("../../utility/hashUtils");

const userResetPassword = asyncHandler(async (req, res) => {
  let { email, newPassword, confirmNewPassword } = req.body;
  email = email?.trim();
  newPassword = newPassword?.toString()?.trim();
  confirmNewPassword = confirmNewPassword?.toString()?.trim();
  if (newPassword !== confirmNewPassword) {
    return ApiResponse.error(
      req,
      res,
      401,
      false,
      "New password and confirm password do not match."
    );
  }

  const userRepo = AppDataSource.getRepository(User);
  if (!email) {
    return ApiResponse.error(req, res, 401, false, "Email is not valid.");
  }
  const user = await userRepo.findOne({ where: { email } });
  if (!user) {
    return ApiResponse.error(req, res, 404, false, "User not found.");
  }
  if (!user?.resetPassword) {
      console.log("hui",user);
      return ApiResponse.error(
      req,
      res,
      401,
      true,
      "You are not authorized to reset the password."
    );
  } else {
    const newPasswordHash = await hashUtils.hashPassword(newPassword);
    user.passwordHash = newPasswordHash;
    await userRepo.save(user);
    // console.log(user)
    ApiResponse.success(req, res, 200, true, "Password updatedd successfully.");
  }
});
module.exports = userResetPassword;
