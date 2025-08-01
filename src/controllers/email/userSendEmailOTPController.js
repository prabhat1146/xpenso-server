const { AppDataSource } = require("../../db/sqldb");
const User = require("../../entities/User");
const asyncHandler = require("../../utility/asyncHandler");
const generateOTP = require("../../utility/generateOTP");
const sendEmail = require("../../utility/email/sendEmail");
const ApiResponse = require("../../utility/apiResponse");
const { emailOTPValidity, mobileOTPValidity } = require("../../constants");


const userSendEmailOTPController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP(); // 6-digit OTP by default

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { email } });

  if (!user) {
    return ApiResponse.error(req, res, 404, false, "User not found.");
  }

  if (user.isEmailVerified) {
    return ApiResponse.error(req, res, 400, false, "Email already verified.");
  }

  user.emailOTP = otp;
  user.emailOTPGeneratedAt=Date.now();
  user.emailOTPExpiresAt=Date.now()+(Number(emailOTPValidity)*60*1000);
  


  await userRepo.save(user);

  const to = email;
  const subject = "Xpenso Email Verification OTP";
  const text = `Your Xpenso verification OTP is: ${otp}`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2 style="color: #4f46e5;">Xpenso Email Verification</h2>
      <p>Hello,</p>
      <p>Your one-time password (OTP) for verifying your email is:</p>
      <h3 style="color: #10b981;">${otp}</h3>
      <p>This OTP will expire in ${emailOTPValidity} minutes. Please do not share it with anyone.</p>
      <br />
      <p>Thank you,<br/>Xpenso Team</p>
    </div>
  `;

  try {
    await sendEmail({ to, subject, text, html });
    return ApiResponse.success(req, res, 200, true, "OTP sent successfully.");
  } catch (err) {
    return ApiResponse.error(req, res, 500, false, "Failed to send email.");
  }
});

module.exports = userSendEmailOTPController;
