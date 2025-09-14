const asyncHandler = require("../../utility/asyncHandler");
const { AppDataSource } = require("../../db/sqldb");
const BLTransaction = require("../../entities/transactions/BLTransaction");
const BLApproval = require("../../entities/transactions/BLApproval");
const ApiResponse = require("../../utility/apiResponse");

const addNewBorrowerLenderTransactionController = asyncHandler(async (req, res) => {
  const { borrowerId,lenderId, amount, remarks,currency } = req.body;

  if(!borrowerId || !lenderId || !amount || !currency){
    ApiResponse.error(req,res,401,false,"All filds are required.",null);
  }

  const transactionRepo = AppDataSource.getRepository("BLTransaction");
  const approvalRepo = AppDataSource.getRepository("BLApproval");


  // 1. Save transaction
  const transaction = transactionRepo.create({
    borrower: { id: borrowerId },
    lender: { id: lenderId },
    amount,
    remarks,
    status: "pending",
    currency:currency
  });

  await transactionRepo.save(transaction);

  // 2. Create approvals
  const userId=req.user.id;
//   console.log(req.user)
  const counterpartId=(userId?.toString()===borrowerId?.toString())?lenderId:borrowerId;

  let approvalData={
      transaction,  // relation ref by id
      user:        { id: userId},      // who this approval row belongs to
      requestedBy: { id: userId },      // who requested the change
      status: "approved",               // initiator auto-approves
      changes: { kind: "create", amount, currency, remarks }, // JSON (no DB default)
    }
    // console.log(approvalData)

  const initiatorApproval = approvalRepo.create(approvalData);
    await approvalRepo.save(initiatorApproval); // INSERT

    const counterpartApproval = approvalRepo.create({
      transaction,
      user:        { id: counterpartId },
      requestedBy: { id: userId },
      status: "pending",
      changes: { kind: "create", amount, currency, remarks },
    });
    await approvalRepo.save(counterpartApproval); 

  // 3. (Optional) Trigger notification
  // notifyUser(counterpartId, `You have a new transaction request of Rs.${amount}`);

  ApiResponse.success(req,res,201,true,"Transaction created & approval request sent to counterpart.",transaction)
//   res.status(201).json({
//     success: true,
//     transaction,
//     message: "Transaction created & approval request sent to counterpart.",
//   });
});

module.exports = addNewBorrowerLenderTransactionController;
