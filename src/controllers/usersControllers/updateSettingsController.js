const { AppDataSource } = require("../../db/sqldb");
const User = require("../../entities/User");
const ApiResponse = require("../../utility/apiResponse");
const asyncHandler = require("../../utility/asyncHandler");
const { comparePassword, hashPassword } = require("../../utility/hashUtils");

// 1.-> check user is authenticated or not
// if not then send api response error as user is not authenticated.
// 2.-> check user exist or not
// if not then send api response error as user not found
// 3.-> check new_password has value or not,
// if have value then verify old_password with db password
// if password verified successfully then go to update new_password and other details
// if password verication failed then send api response error as old password is wrong
//

const updateUserSettingsController = asyncHandler(async (req, res) => {
  const userMobile = req.user?.mobile;

  let {
    firstName,
    middleName,
    lastName,
    email,
    mobile,
    receiveEmails,
    darkMode,
    newPassword,
    confirmNewPassword,
    currentPassword,
  } = req.body;

  if (!userMobile) {
    return ApiResponse.error(req, res, 401, false, "User not authenticated.");
  }

  // Trim string inputs
  firstName = firstName?.toString().trim();
  middleName = middleName?.toString().trim();
  lastName = lastName?.toString().trim();
  email = email?.toString().trim();
  mobile = mobile?.toString().trim();
  newPassword = newPassword?.toString().trim();
  confirmNewPassword = confirmNewPassword?.toString().trim();
  currentPassword = currentPassword?.toString().trim();

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { mobile: userMobile } });

  if (!user) {
    return ApiResponse.error(req, res, 404, false, "User not found.");
  }
  //update new password
  
  if (currentPassword || newPassword || confirmNewPassword) {
    if (newPassword === confirmNewPassword) {
      if (newPassword?.length < 6) {
        return ApiResponse.error(
          req,
          res,
          400,
          false,
          "Password is too short."
        );
      }
    } else {
      return ApiResponse.error(
        req,
        res,
        401,
        false,
        "New password and confirm new password did not match."
      );
    }

    const hashedPassword = user.passwordHash;
    if (!(await comparePassword(currentPassword, hashedPassword))) {
      return ApiResponse.error(req, res, 401, false, "Wrong password");
    }
  }

  let newHashedPasswd = null;
  if (currentPassword && newPassword && confirmNewPassword) {
    newHashedPasswd = await hashPassword(newPassword);
  }
  // Update only if value is provided (nullish coalescing)
  
  user.firstName = firstName ?? user.firstName;
  user.middleName = middleName ?? user.middleName;
  user.lastName = lastName ?? user.lastName;
  user.email = email ?? user.email;
//   user.mobile = mobile ?? user.mobile;
  user.passwordHash = newHashedPasswd ?? user.passwordHash;

//   console.log(user)
  //   user.receiveEmails = receiveEmails ?? user.receiveEmails;
  //   user.darkMode = darkMode ?? user.darkMode;

  await userRepo.save(user);
  ApiResponse.success(req, res, 200, true, "Settings updated successfully.");
});

module.exports = updateUserSettingsController;
