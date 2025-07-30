const asyncHandler = require("../../utility/asyncHandler");
const generateOTP = require("../../utility/generateOTP");

const sendSignInEmailOTP=asyncHandler(async(req,res)=>{
    const {email}=req.body;
const otp=generateOTP();

})