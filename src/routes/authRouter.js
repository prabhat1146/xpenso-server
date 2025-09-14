const express=require("express");
const signUpUserController = require("../controllers/usersControllers/userSignUp");
const loginController = require("../controllers/usersControllers/userLogin");
const userForgotPassword = require("../controllers/usersControllers/userForgotPassword");
const userResetPassword = require("../controllers/usersControllers/userResetPassword");
const router=express.Router();


router.post("/sign-up",signUpUserController);
router.post("/login",loginController);
router.post("/forgot-password",userForgotPassword);
router.post("/reset-password",userResetPassword);


module.exports=router;