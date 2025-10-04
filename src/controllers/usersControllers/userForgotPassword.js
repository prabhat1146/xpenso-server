const { AppDataSource } = require("../../db/sqldb");
const User = require("../../entities/User");
const ApiResponse = require("../../utility/apiResponse");
const asyncHandler = require("../../utility/asyncHandler");
const isValidEmail = require("../../utility/email/isEmailValid");
const sendEmail = require("../../utility/email/sendEmail");
const generateOTP = require("../../utility/generateOTP");
const userSendEmailOTPController = require("../email/userSendEmailOTPController");

const userForgotPassword = asyncHandler(async (req, res) => {
    
    const { email } = req.body;
    const otp = generateOTP();

    const userRepo=AppDataSource.getRepository(User);
    const user=await userRepo.findOne({where:{email}})
    if(!user){
        return ApiResponse.error(req,res,404,false,"User not found.")
    }
    user.emailOTP=otp;
    user.resetPassword=true;
    // console.log(user)
    await userRepo.save(user);
    
    const subject = "Password Reset Request - Mithilax";
    const text = `Your OTP for password reset is: ${otp}`;
    const html = `
    <h2>Password Reset Request</h2>
    <p>We received a request to reset your password.</p>
    <p><strong>Your OTP is: ${otp}</strong></p>
    <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    `;
    
    if (isValidEmail(email)) {
        // console.log(email);
        const to=email;
        await sendEmail({to, subject, text, html});
        ApiResponse.error(
      req,
      res,
      200,
      true,
      "OTP is sent to your email."
    );
  } else {
    ApiResponse.error(
      req,
      res,
      404,
      false,
      "This service is not available right now."
    );
  }
});

module.exports = userForgotPassword;
