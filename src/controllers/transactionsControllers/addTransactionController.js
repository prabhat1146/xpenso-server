const { AppDataSource } = require("../../db/sqldb");
const Transaction = require("../../entities/Transaction");
const ApiResponse = require("../../utility/apiResponse");
const asyncHandler = require("../../utility/asyncHandler");
const { getCurrentDateTime } = require("../../utility/dateTimeFormate");

const addTransactionsController = asyncHandler(async (req, res) => {
  let { type, mode, category, amount, notes } = req.body;

//   let token = req.headers['authorization'];
//   console.log(req.user);

  type=type?.trim();
  mode=mode?.toString().trim();
  category=category?.toString().trim();
  amount=amount?.trim();
  notes=notes?.trim();

  if(!type || !mode || !category || !amount){
    ApiResponse.error(req,res,400,false,"All fields are required.");
    return;
  }

  const transaction={
    type,
    mode,
    category,
    amount,
    notes,
    mobile:req?.user?.mobile,
    transactionDate:getCurrentDateTime().dateFormate,
    
  }

  const transactionRepo=AppDataSource.getRepository(Transaction);
  const new_transaction=transactionRepo.create(transaction);
  await transactionRepo.save(new_transaction);

  ApiResponse.success(req,res,200,true,"New transaction added successfully.");

  
});
module.exports = addTransactionsController;
