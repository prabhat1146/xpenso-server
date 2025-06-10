const { AppDataSource } = require("../../db/sqldb");
const Transaction = require("../../entities/Transaction");
const ApiResponse = require("../../utility/apiResponse");
const asyncHandler = require("../../utility/asyncHandler");


const getTransactionsController = asyncHandler(async (req, res) => {
  

  const transactionRepo=AppDataSource.getRepository(Transaction);
  const transactions = await transactionRepo.find({
  relations: ['category', 'mode']
});

  ApiResponse.success(req,res,200,true, "Transactions fetched successfully", transactions);

  
});
module.exports = getTransactionsController;
