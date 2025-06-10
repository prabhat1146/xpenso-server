const express=require("express");
const router=express.Router();

const addTransactionsController = require("../controllers/transactionsControllers/addTransactionController");
const getTransactionsController = require("../controllers/transactionsControllers/getTransactionController");


router.post("/add-transaction",addTransactionsController);
router.get("/get-transactions",getTransactionsController);


module.exports=router;