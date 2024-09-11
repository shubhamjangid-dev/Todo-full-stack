import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// generate Access tokens and refresh tokens using fumc written in user Schema
const generateAccessTokenAndRefreshToken = async user => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false }); // validate before save ka mtlb h mongoose schema me ko validate nahi krega ki ye required h ki nahi etc
  return { accessToken, refreshToken };
};

const HandleUserRegister = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;
  if (!fullname || !username || !email || !password) {
    return res.status(400).json(new ApiError(400, "All fields required"));
  }

  const userExist = await User.findOne({ $or: [{ email }, { username }] });

  if (userExist) {
    return res.status(409).json(new ApiError(409, "user already exist"));
  }

  const createdUser = await User.create({ fullname, username, email, password });

  if (!createdUser) {
    return res.status(500).json(new ApiError(500, "Something went wrong while creating user"));
  }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(createdUser);

  const userData = await User.findById(createdUser._id).select("-password -refreshToken");

  if (!userData) {
    return res.status(500).json(new ApiError(500, "Something went wrong while getting created user"));
  }

  const cookieOption = {
    httpOnly: true,
  };
  return res.status(200).cookie("accessToken", accessToken, cookieOption).cookie("refreshToken", refreshToken, cookieOption).json(new ApiResponse(201, "user registered successfully", userData));
});

const HandleUserLogin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // username or email me se ek or password hona chahiye verna send required
  if ((!username && !email) || !password) {
    return res.status(400).json(new ApiError(401, "All fields are required"));
  }

  const userExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!userExist) {
    return res.status(404).json(new ApiError(404, "User don't exist"));
  }

  // TODO: isse achhe se krna h
  if (userExist.password != password) {
    return res.status(403).json(new ApiError(403, "Invalid credentials"));
  }

  const userData = await User.findById(userExist._id).select("-password -refreshToken");

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(userData);

  const cookieOption = {
    httpOnly: true,
  };

  return res.status(200).cookie("accessToken", accessToken, cookieOption).cookie("refreshToken", refreshToken, cookieOption).json(new ApiResponse(201, "User Logges in Successfully", userData));
});

const HandleUserLogout = asyncHandler(async (req, res) => {
  const user = req.user; // middleware ne add kiya h cookie ko verify kr ke

  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false }); // validate before save ka mtlb h mongoose schema me ko validate nahi krega ki ye required h ki nahi etc
  const cookieOption = {
    httpOnly: true,
  };
  return res.status(203).clearCookie("accessToken", cookieOption).clearCookie("refreshToken", cookieOption).json(new ApiResponse(203, "User logged out successfully"));
});

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;

  return res.status(201).json(new ApiResponse(201, "User Fetched Successfully", user));
});

export { HandleUserRegister, HandleUserLogin, HandleUserLogout, getUser };
