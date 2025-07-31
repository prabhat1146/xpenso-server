const express=require('express');
const userVerifyEmailOTPController = require('../controllers/email/userVerifyEmailOTPController');
const userSendEmailOTPController = require('../controllers/email/userSendEmailOTPController');
const router=express.Router();

router.post('/send-email-otp',userSendEmailOTPController);
router.post('/verify-email-otp',userVerifyEmailOTPController);

module.exports=router;