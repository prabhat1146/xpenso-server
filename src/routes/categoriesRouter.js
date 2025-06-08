const express=require("express");
const { getCategoriesController } = require("../controllers/categoriesControllers/getCategoriesControllers");
const router=express.Router();


router.get("/get-categories",getCategoriesController);


module.exports=router;