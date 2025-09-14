const express=require("express");
const router=express.Router();

const addNewBorrowerLenderTransactionsController = require("../controllers/borrowerLender/addNewBorrowerLenderTransactionController");
const { getBorrowerLenderAllTransactionsController } = require("../controllers/borrowerLender/getBorrowerLenderAllTransactionsController");
// const getTransactionsController = require("../controllers/transactionsControllers/getTransactionController");


router.post("/add-new-borrower-lender-transaction",addNewBorrowerLenderTransactionsController);
router.get("/get-borrower-lender-all-transactions",getBorrowerLenderAllTransactionsController);


module.exports=router;