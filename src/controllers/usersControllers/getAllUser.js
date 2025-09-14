const asyncHandler = require("../../utility/asyncHandler");
const { AppDataSource } = require("../../db/sqldb");
const  User  = require("../../entities/User");

const getAllUserControllers = asyncHandler(async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);

  const users = await userRepo.find({
    select: ["id", "firstName", "middleName", "lastName", "mobile", "email"], 
  });

  res.status(200).json(users);
});

module.exports = getAllUserControllers;
