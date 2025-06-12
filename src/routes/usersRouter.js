const express=require("express");
const signUpUserController = require("../controllers/usersControllers/userSignUp");
const loginController = require("../controllers/usersControllers/userLogin");
const updateUserSettingsController = require("../controllers/usersControllers/updateSettingsController");
const router=express.Router();


router.post("/update-user-settings",updateUserSettingsController);
// router.post("/login",loginController);


module.exports=router;