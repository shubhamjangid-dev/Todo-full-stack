import { Group } from "../models/groupSchema.js";
import { User } from "../models/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const HandleGroupCreate = asyncHandler(async (req, res) => {
  const admin = req.user;
  const { groupname } = req.body;

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

  if (!groupname) {
    return res.status(403).json(new ApiError(403, "group name required"));
  }

  const renamedGroup = await Group.findByIdAndUpdate(groupId, { groupname });

  if (!renamedGroup) {
    res.status(404).json(new ApiError(404, "Group Don't Exist"));
  }

  return res.status(201).json(new ApiResponse(201, "Group Renamed Successfully ! ", renamedGroup));
});

const HandleGroupAddMembers = asyncHandler(async (req, res) => {
  const admin = req.user;

  const { groupId, emails } = req.body;

  if (!emails.length) {
    return res.status(401).json(new ApiError(401, "please enter emails"));
  }
  const groupExist = await Group.findById(groupId);

  if (!groupExist) {
    return res.status(403).json(new ApiError(403, "group dont exist"));
  }

  let members = [...groupExist.members];

  groupExist.members = await addMembersId(emails, members);
  await groupExist.save({ ValidateBeforeSave: false });
  const updatedGroup = await Group.findById(groupExist._id);

  if (!updatedGroup) {
    return res.status(403).json(new ApiError(403, "something went wrong while adding members"));
  }

  return res.status(201).json(new ApiResponse(203, "members added Successfully!", updatedGroup));
});
const addMembersId = async (emails, members) => {
  for (const email of emails) {
    const user = await User.findOne({ email });
    if (user) {
      members.push(user._id);
    }
  }
  return members.filter((member, index, self) => index === self.findIndex(m => member.equals(m)));
};

const HandleGroupRemoveMember = asyncHandler(async (req, res) => {
  const user = req.user;
  //TODO: ya to khud ko remove kre ya vo admin ho
  const { remUser, groupId } = req.body;
  const groupExist = await Group.findById(groupId);

  if (!groupExist) {
    return res.status(403).json(new ApiError(403, "group dont exist"));
  }

  const removeUser = await User.findById(remUser);

  if (!removeUser) {
    return res.status(403).json(new ApiError(403, "user dont exist"));
  }

  let members = [...groupExist.members];
  members = members.filter(member => !member.equals(removeUser._id));

  groupExist.members = members;
  await groupExist.save({ ValidateBeforeSave: false });

  const updatedGroup = await Group.findById(groupExist._id);

  return res.status(201).json(new ApiResponse(203, "members added Successfully!", updatedGroup));
});

const SubHandleGroupAddProject = async (groupId, project) => {
  const groupExist = await Group.findById(groupId);
  if (!groupExist) {
    return res.status(403).json(new ApiError(403, "group dont exist"));
  }
  groupExist.projectArray.push(project._id);
  await groupExist.save({ ValidateBeforeSave: false });
};

const SubHandleGroupRemoveProject = async (groupId, project) => {
  const groupExist = await Group.findById(groupId);
  if (!groupExist) {
    return res.status(403).json(new ApiError(403, "group dont exist"));
  }
  let allProjects = [...groupExist.projectArray];
  allProjects = allProjects.filter(item => !item.equals(project._id));
  groupExist.projectArray = allProjects;
  await groupExist.save({ ValidateBeforeSave: false });
};

export { HandleGroupCreate, HandleGroupRename, HandleGroupAddMembers, HandleGroupRemoveMember, SubHandleGroupAddProject, SubHandleGroupRemoveProject };
