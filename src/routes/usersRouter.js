const express=require("express");
const signUpUserController = require("../controllers/usersControllers/userSignUp");
const loginController = require("../controllers/usersControllers/userLogin");
const updateUserSettingsController = require("../controllers/usersControllers/updateSettingsController");
const getAllUserControllers = require("../controllers/usersControllers/getAllUser");
const router=express.Router();


router.post("/update-user-settings",updateUserSettingsController);
router.get("/get-all-users",getAllUserControllers);
// router.post("/login",loginController);


module.exports=router;