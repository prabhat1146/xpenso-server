const express=require("express");
const addRatingController = require("../controllers/ratingsControllers/addRatingController");
const getTotalRatingController = require("../controllers/ratingsControllers/getTotalRatingController");
const router=express.Router();


router.post("/add-rating",addRatingController);
router.get("/get-total-ratings",getTotalRatingController);


module.exports=router;