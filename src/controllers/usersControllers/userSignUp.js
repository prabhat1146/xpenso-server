const asyncHandler = require("../../utility/asyncHandler");
const { AppDataSource } = require("../../db/sqldb");
const ApiResponse = require("../../utility/apiResponse");
const Logger = require("../../utility/logger");
const User = require("../../entities/User");
const hashUtils = require("../../utility/hashUtils");
const sendEmail = require("../../utility/email/sendEmail");
const generateOTP = require("../../utility/generateOTP");
const { emailOTPValidity, mobileOTPValidity } = require("../../constants");

const signUpUserController = asyncHandler(async (req, res, next) => {
  const userRepo = AppDataSource.getRepository(User);

  const { mobile, firstName, middleName, lastName, email, password } = req.body;

  // console.log(req.body)
  // Basic validation
  if (!mobile || !firstName || !lastName || !email || !password) {
    return ApiResponse.error(
      req,
      res,
      400,
      false,
      "All required fields must be provided"
    );
  }

  // Check for existing user by mobile or email
  const existing = await userRepo.findOne({ where: [{ email }, { mobile }] });
  if (existing) {
    return ApiResponse.error(
      req,
      res,
      409,
      false,
      "User with given email or mobile already exists"
    );
  }

  //send email otp

  const email_otp = generateOTP();
  const mobile_otp = generateOTP();

  const to = email;
  const subject = "Xpenso Email Verification Code";

  const text = `Your Xpenso verification code is ${email_otp}. 
This code is valid for 10 minutes. 
If you did not request this, please ignore the email.`;

  const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0;">
      <h2 style="color: #333;">🔐 Verify your Email for <span style="color: #4e73df;">Xpenso</span></h2>
      <p style="font-size: 16px;">Use the following OTP to verify your email address:</p>
      <h1 style="font-size: 36px; color: #4e73df; margin: 20px 0;">${email_otp}</h1>
      <p style="font-size: 14px; color: #666;">This OTP is valid for <strong>${emailOTPValidity} minutes</strong>.</p>
      <p style="font-size: 14px; color: #999;">If you did not request this, you can safely ignore this email.</p>
    </div>
  </div>
`;

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
    emailOTP: email_otp,
    emailOTPGeneratedAt: Date.now(),
    emailOTPExpiresAt: Date.now() + Number(emailOTPValidity) * 60 * 1000,
    mobileOTP: mobile_otp,
    mobileOTPGeneratedAt: Date.now(),
    mobileOTPExpiresAt: Date.now() + Number(mobileOTPValidity) * 60 * 1000,
  });

  await userRepo.save(user);
  await sendEmail({ to, subject, text, html });

  ApiResponse.success(req, res, 201, true, "User created successfully", {
    mobile: user.mobile,
    firstName: user?.firstName,
    middleName: user?.middleName,
    lastName: user?.lastName,
    email: user?.email,
    createdAt: user.createdAt,
  });

  Logger.info(
    `[${new Date().toISOString()}] POST ${req?.originalUrl} - ${
      req.ip
    } - User ${email} created`
  );
});

module.exports = signUpUserController;
