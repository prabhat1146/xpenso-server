const asyncHandler = require("../../utility/asyncHandler");
const {AppDataSource} = require("../../db/sqldb");
const ApiResponse = require("../../utility/apiResponse");


const getBorrowerLenderAllTransactionsController = asyncHandler(async (req, res) => {
  const userId = Number(req.user.id);

  const txRepo = AppDataSource.getRepository("BLTransaction");

  // Fetch transactions where user is either borrower or lender
  const transactions = await txRepo.find({
    where: [
      { borrower: { id: userId } },
      { lender: { id: userId } },
    ],
    relations: [
      "borrower",
      "lender",
      "approvals",       // include approval rows if you want
      "approvals.user",  // approval user
      "approvals.requestedBy",
    ],
    order: { createdAt: "DESC" }, // adjust according to your column
  });

  return ApiResponse.success(
    req,
    res,
    200,
    true,
    "Fetched all transactions for user",
    { transactions }
  );
});

module.exports = {
  getBorrowerLenderAllTransactionsController,
};
