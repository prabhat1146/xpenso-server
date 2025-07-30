const express=require('express');
const userVerifyMobileOTPController = require('../controllers/mobile/verifyMobileOTPController');
const router=express.Router();
router.post('/verify-mobile-otp',userVerifyMobileOTPController)
module.exports=router;