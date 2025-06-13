const { AppDataSource } = require("../../db/sqldb");
const Transaction = require("../../entities/Transaction");
const ApiResponse = require("../../utility/apiResponse");
const asyncHandler = require("../../utility/asyncHandler");


const getTransactionsController = asyncHandler(async (req, res) => {

  const userMobile = req.user?.mobile;
  if(!userMobile){
    return ApiResponse.error(req,res,401,false, "User is not authenticated.", []);
  }

  const transactionRepo=AppDataSource.getRepository(Transaction);
  const transactions = await transactionRepo.find({
    where: {
    mobile: userMobile, // or id: userId
  },
  relations: ['category', 'mode']
});

  ApiResponse.success(req,res,200,true, "Transactions fetched successfully", transactions);

  
});
module.exports = getTransactionsController;
