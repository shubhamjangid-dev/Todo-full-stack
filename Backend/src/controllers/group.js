import { Group } from "../models/groupSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const HandleGroupCreate = asyncHandler(async (req, res) => {
  const admin = req.user;
  const { groupname } = req.body;

  if (!admin) {
    return res.status(403).json(new ApiError(403, "user is not authorised to access this route"));
  }
  if (!groupname) {
    return res.status(403).json(new ApiError(403, "group name required"));
  }

  const createdGroup = await Group.create({
    groupname,
    admin: admin._id,
    members: [],
    projectArray: [],
  });
  if (!createdGroup) {
    return res.status(500).json(new ApiResponse(500, "Something went wrong while creating group"));
  }

  return res.status(201).json(new ApiResponse(201, "Group Created Successfully ! ", createdGroup));
});

const HandleGroupRename = asyncHandler(async (req, res) => {
  const admin = req.user;
  const { groupname, groupId } = req.body;

  if (!admin) {
    return res.status(403).json(new ApiError(403, "user is not authorised to access this route"));
  }
  if (!groupname) {
    return res.status(403).json(new ApiError(403, "group name required"));
  }

  const renamedGroup = await Group.findByIdAndUpdate(groupId, { groupname });

  if (!renamedGroup) {
    res.status(404).json(new ApiError(404, "Group Don't Exist"));
  }

  return res.status(201).json(new ApiResponse(201, "Group Renamed Successfully ! ", renamedGroup));
});

export { HandleGroupCreate, HandleGroupRename };
