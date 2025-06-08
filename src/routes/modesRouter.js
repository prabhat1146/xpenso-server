const express=require("express");
const { getModesController } = require("../controllers/modesControllers/getModesControllers");
const router=express.Router();


router.get("/get-modes",getModesController);


module.exports=router;