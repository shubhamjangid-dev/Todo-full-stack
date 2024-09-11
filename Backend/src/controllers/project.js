import { Project } from "../models/projectSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SubHandleGroupAddProject } from "./group.js";

const HandleProjectCreate = asyncHandler(async (req, res) => {
  const { projectName, groupId } = req.body;
  const user = req.user;

  if (!projectName) {
    return res.status(403).json(new ApiError(403, "Project name required"));
  }

  const createdProject = await Project.create({
    projectname: projectName,
  });

  if (!createdProject) {
    return res.status(500).json(new ApiError(500, "Something whent wrong while creating project"));
  }
  await SubHandleGroupAddProject(groupId, createdProject);
  return res.status(203).json(new ApiResponse(203, "Project created Successfully!", createdProject));
});

const HandleProjectRename = asyncHandler(async (req, res) => {
  const { projectId, projectName } = req.body;

  if (!projectName) {
    return res.status(404).json(new ApiError(404, "Project Name Required!"));
  }
  if (!projectId) {
    return res.status(404).json(new ApiError(404, "Project Id Required!"));
  }
  const renamedProject = await Project.findByIdAndUpdate(projectId, { projectname: projectName });

  if (!renamedProject) {
    return res.status(404).json(new ApiError(404, "Project doesn't exist!"));
  }

  return res.status(203).json(new ApiResponse(203, "Project renamed successfully!", renamedProject));
});

const HandleProjectDelete = asyncHandler(async (req, res) => {});

export { HandleProjectCreate, HandleProjectRename, HandleProjectDelete };
