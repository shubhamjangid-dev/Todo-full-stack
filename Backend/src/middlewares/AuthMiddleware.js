import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userSchema.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyTokens = asyncHandler(async (req, res, next) => {
  try {
    console.log("A : extracting accessToken ...");
    const accessToken = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ", "");
    if (!accessToken) {
      console.log("a: accessToken not found");

      return res.status(401).json(new ApiError(401, "Not authorized to access this route"));
    }
    console.log("B : decoding accessToken ...");
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!decodedToken) {
      console.log("b : accessToken is expired or altered");
      return res.status(401).json(new ApiError(401, "Token is Expired or Altered"));
    }
    console.log("C : fetching user information from database ... ");
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
      console.log("c : no match found");
      return res.status(401).json(new ApiError(401, "Invalid accessToken"));
    }
    console.log("D : user Information fetched Successfully \nname :", user.fullname);
    req.user = user;
    next();
  } catch (error) {
    // throw new ApiError(401, "Error invalid refresh token");
    // return res.status(203).json(new ApiError(403, error.message));
    console.log(error);

    res.status(401).json(new ApiError(401, "You are not authorised", error));
    next(error);
  }
});
