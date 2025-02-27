import jwt from 'jsonwebtoken'
import ApiError from "../utilities/apiError.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import { User } from '../models/user.model.js';

const verifyJWT= asyncHandlerFunction(async (req,res,next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")

    if(!token){
    //   res.redirect("/api/v1/user/login");
    throw new ApiError(401,'token expired or not found');
    }
  
    const decodedToken  =await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id);
    if(!user){
      res.redirect("/api/v1/user/login");
       
    }
    
    req.user =user 

    req.user = user; 
    if(!req.user){
      res.redirect("/api/v1/user/login");
    }

    next();
})

export {verifyJWT}