const asyncHandler = require("../../utility/asyncHandler");
const ApiResponse = require("../../utility/apiResponse");
const Logger = require("../../utility/logger");
const { AppDataSource } = require("../../db/sqldb");
const Category = require("../../entities/Category");


const getCategoriesController = asyncHandler(async (req, res, next) => {
  const categoriesRepo = AppDataSource.getRepository(Category);
  const categories = await categoriesRepo.find();
  

  ApiResponse.success(req,res,200,true, "Categories fetched successfully", categories);
  Logger.info(`[${new Date().toISOString()}] GET ${req?.originalUrl} - ${req.ip} - Categories fetched successfully`);
  return;

});

module.exports = {
  getCategoriesController
};
