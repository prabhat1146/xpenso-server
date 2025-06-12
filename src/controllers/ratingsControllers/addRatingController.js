const { AppDataSource } = require("../../db/sqldb");
const Rating = require("../../entities/Rating");
const User = require("../../entities/User");
const ApiResponse = require("../../utility/apiResponse");
const asyncHandler = require("../../utility/asyncHandler");

const addRatingController=asyncHandler(async(req,res)=>{
    let {score,comment}=req?.body;
    const userMobile=req?.user?.mobile;
    score=score?.toString()?.trim();
    comment=comment?.toString()?.trim();

    if(!score || !comment || !userMobile){
        ApiResponse.error(req,res,400,false,"All fields are required.");
        return ;
    }

    const userRepo=AppDataSource.getRepository(User);
    const user=await userRepo.findOne({where:{mobile:userMobile}});
    if(!user){
        ApiResponse.error(req,res,404,false,"User not found");
        return;
    }
    const ratingRepo=AppDataSource.getRepository(Rating);
    const rating_data={
        score,
        comment,
        user,
    }

    const new_rating=ratingRepo.create(rating_data);
    await ratingRepo.save(new_rating);
    const data={
        rating:new_rating?.score,
        feedback:new_rating?.comment,
        createdAt:new_rating?.createdAt,
        
    }

    ApiResponse.success(req,res,200,true,"Thanks for rating.",data);
    return ;


});
module.exports=addRatingController;