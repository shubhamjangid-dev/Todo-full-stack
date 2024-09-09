import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userSchema.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyTokens = asyncHandler(async (req, res, next) => {
  try {
    console.log("A");
    const accessToken = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ", "");
    if (!accessToken) {
      console.log("a");

      return res.status(401).json(new ApiError(401, "Not authorized to access this route"));
    }
    console.log("B");
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!decodedToken) {
      console.log("b");
      return res.status(401).json(new ApiError(401, "Token is Expired or Altered"));
    }
    console.log("C");
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
      console.log("c");
      return res.status(401).json(new ApiError(401, "Invalid accessToken"));
    }
    console.log("d");
    req.user = user;
    next();
  } catch (error) {
    // throw new ApiError(401, "Error invalid refresh token");
    // return res.status(203).json(new ApiError(403, error.message));
    console.log(error);

    req.user = null;
    next();
  }
});
