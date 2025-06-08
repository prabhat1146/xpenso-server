const express=require("express");
const signUpUserController = require("../controllers/usersControllers/userSignUp");
const loginController = require("../controllers/usersControllers/userLogin");
const router=express.Router();


router.post("/sign-up",signUpUserController);
router.post("/login",loginController);


module.exports=router;