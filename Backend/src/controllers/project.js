import { Project } from "../models/projectSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SubHandleGroupAddProject } from "./group.js";

const HandleProjectCreate = asyncHandler(async (req, res) => {
  const { projectName, color, groupId } = req.body;
  const user = req.user;

  if (!projectName) {
    return res.status(403).json(new ApiError(403, "Project name required"));
  }

  const createdProject = await Project.create({
    projectname: projectName,
    color,
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

const HandleProjectGetProjectInfo = asyncHandler(async (req, res) => {
  const { projectId } = req.body;
  const projectExist = await Project.findById(projectId);
  const projectData = await Project.aggregate([
    {
      $match: {
        _id: projectExist?._id,
      },
    },
    {
      $lookup: {
        from: "todos",
        localField: "todoArray",
        foreignField: "_id",
        as: "allTodos",
      },
    },
    {
      $addFields: {
        allTodos: "$allTodos",
      },
    },
    {
      $project: {
        todoArray: 0,
      },
    },
  ]);

  if (!projectData) {
    return res.status(500).json(new ApiError(500, "Something went wrong while getting project info"));
  }

  return res.status(201).json(new ApiResponse(201, "information fetched successfully", projectData[0]));
});

const SubHandleProjectAddTodo = async (projectId, todo) => {
  const projectExist = await Project.findById(projectId);
  if (!projectExist) {
    return null;
  }
  projectExist.todoArray.push(todo._id);
  await projectExist.save({ ValidateBeforeSave: false });
  return true;
};

const SubHandleProjectRemoveTodo = async (projectId, todo) => {
  const projectExist = await Project.findById(projectId);
  if (!projectExist) {
    return res.status(403).json(new ApiError(403, "project dont exist"));
  }
  let allTodos = [...projectExist.todoArray];
  allTodos = allTodos.filter(item => !item.equals(todo._id));
  allTodos.todoArray = allTodos;
  await projectExist.save({ ValidateBeforeSave: false });
};
export { HandleProjectCreate, HandleProjectRename, HandleProjectDelete, HandleProjectGetProjectInfo, SubHandleProjectAddTodo, SubHandleProjectRemoveTodo };
