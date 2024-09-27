import { Group } from "../models/groupSchema.js";
import { User } from "../models/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";
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
  await generateInviteLink(createdGroup);
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
    return res.status(403).json(new ApiError(403, "group doesnt exist"));
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

const HandleGroupJoinGroup = asyncHandler(async (req, res) => {
  const user = req.user;

  const { inviteLink } = req.body;

  const groupExist = await Group.findOne({ invitelink: inviteLink });

  if (!groupExist) {
    return res.status(403).json(new ApiError(403, "Invite link is expired"));
  }

  if (!groupExist.acceptInviteThroughLink) {
    return res.status(403).json(new ApiError(403, "Admin disabled the invite link"));
  }

  let members = [...groupExist.members];

  groupExist.members = await addMembersId([user.email], members);
  await groupExist.save({ ValidateBeforeSave: false });
  const updatedGroup = await Group.findById(groupExist._id);

  if (!updatedGroup) {
    return res.status(403).json(new ApiError(403, "something went wrong while joining group"));
  }

  return res.status(201).json(new ApiResponse(203, "you joined group Successfully!", updatedGroup));
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

const generateInviteLink = async group => {
  const link = nanoid(20);
  group.invitelink = link;
  await group.save({ ValidateBeforeSave: false });
  return link;
};

const HandleGroupResetInviteLink = asyncHandler(async (req, res) => {
  const admin = req.user;

  const { groupId } = req.body;

  const groupExist = await Group.findById(groupId);

  if (!groupExist) {
    return res.status(403).json(new ApiError(403, "group doesnt exist"));
  }

  await generateInviteLink(groupExist);

  const updatedGroup = await Group.findById(groupExist._id);

  if (!updatedGroup) {
    return res.status(403).json(new ApiError(403, "something went wrong while resetting link"));
  }

  return res.status(201).json(new ApiResponse(203, "New link generated Successfully!", updatedGroup));
});

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

const HandleGroupGetGroupProjectData = asyncHandler(async (req, res) => {
  const user = req.user;
  const groupData = await Group.aggregate([
    {
      $match: {
        $or: [
          {
            admin: user._id,
          },
          {
            members: user._id,
          },
        ],
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "projectArray",
        foreignField: "_id",
        as: "allProjects",
      },
    },
    {
      $project: {
        projectArray: 0,
      },
    },
    {
      $addFields: {
        allProjects: "$allProjects",
      },
    },
  ]);

  if (!groupData) {
    return res.status(500).json(new ApiError(500, "Something went wrong while getting groups and projects"));
  }

  return res.status(201).json(new ApiResponse(201, "information fetched successfully", groupData));
});

const HandleGroupGetGroupInfo = asyncHandler(async (req, res) => {
  const { groupId } = req.body;
  const groupExist = await Group.findById(groupId);
  const groupData = await Group.aggregate([
    {
      $match: {
        _id: groupExist?._id,
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "projectArray",
        foreignField: "_id",
        as: "allProjects",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "members",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "admin",
        foreignField: "_id",
        as: "admin",
      },
    },
    {
      $addFields: {
        allProjects: "$allProjects",
        members: "$members",
        admin: { $first: "$admin" },
      },
    },
    {
      $project: {
        projectArray: 0,
        mem: 0,
      },
    },
  ]);

  if (!groupData) {
    return res.status(500).json(new ApiError(500, "Something went wrong while getting groups info"));
  }

  return res.status(201).json(new ApiResponse(201, "information fetched successfully", groupData[0]));
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

export {
  HandleGroupCreate,
  HandleGroupRename,
  HandleGroupAddMembers,
  HandleGroupRemoveMember,
  HandleGroupJoinGroup,
  HandleGroupResetInviteLink,
  HandleGroupGetGroupProjectData,
  HandleGroupGetGroupInfo,
  SubHandleGroupAddProject,
  SubHandleGroupRemoveProject,
};
