const express=require('express');
const userVerifyEmailOTPController = require('../controllers/email/userVerifyEmailOTPController');
const router=express.Router();
router.post('/verify-email-otp',userVerifyEmailOTPController)
module.exports=router;