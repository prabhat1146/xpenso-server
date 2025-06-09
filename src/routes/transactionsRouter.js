const express=require("express");
const router=express.Router();

const addTransactionsController = require("../controllers/transactionsControllers/addTransactionController");


router.post("/add-transaction",addTransactionsController);


module.exports=router;