import { Todo } from "../models/todoSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SubHandleProjectAddTodo } from "./project.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const HandleTodoCreate = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { projectId, title, discription, duedate, priority, status, asignedTo } = req.body;

  console.log(duedate);

  const createdTodo = await Todo.create({ title, discription, duedate, priority, status, asignedTo });

  if (!createdTodo) {
    return res.status(500).json(new ApiError(500, "Something whent wrong while creating todo"));
  }
  const isSuccess = await SubHandleProjectAddTodo(projectId, createdTodo);

  if (!isSuccess) {
    await Todo.findByIdAndDelete(createdTodo._id);
    return res.status(403).json(new ApiError(403, "project dont exist"));
  }

  return res.status(203).json(new ApiResponse(203, "Todo created Successfully!", createdTodo));
});

export { HandleTodoCreate };
