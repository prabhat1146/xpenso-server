const asyncHandler = require("../../utility/asyncHandler");
const { getRepository } = require("typeorm");
const Mode = require("../../entities/Mode");
const ApiResponse = require("../../utility/apiResponse");
const Logger = require("../../utility/logger");
const { AppDataSource } = require("../../db/sqldb");


const getModesController = asyncHandler(async (req, res, next) => {
  const modeRepo = AppDataSource.getRepository(Mode);
  const modes = await modeRepo.find();
  

  ApiResponse.success(res,200,true, "Modes fetched successfully", modes);
  Logger.info(`[${new Date().toISOString()}] GET ${req?.originalUrl} - ${req.ip} - Modes fetched successfully`);
  return;

});

module.exports = {
  getModesController,
};
