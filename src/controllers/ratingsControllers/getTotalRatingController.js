const { AppDataSource } = require("../../db/sqldb");
const Rating = require("../../entities/Rating");
const ApiResponse = require("../../utility/apiResponse");
const asyncHandler = require("../../utility/asyncHandler");

const getTotalRatingController = asyncHandler(async (req, res) => {
  const ratingRepo = AppDataSource.getRepository(Rating);

  const result = await ratingRepo
    .createQueryBuilder("rating")
    .select("AVG(rating.score)", "average")
    .addSelect("COUNT(rating.id)", "totalRatings")
    .getRawOne();

  const averageRating = parseFloat(result.average).toFixed(2);
  const totalRatings = parseInt(result.totalRatings);

  return ApiResponse.success(req, res, 200, true,"Rating summary", {
    averageRating: isNaN(averageRating) ? "0.00" : averageRating,
    totalRatings: isNaN(totalRatings) ? 0 : totalRatings,
  });
});

module.exports = getTotalRatingController;
