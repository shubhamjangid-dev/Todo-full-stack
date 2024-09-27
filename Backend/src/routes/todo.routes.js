import { Router } from "express";
import { HandleTodoCreate } from "../controllers/todo.js";

const todoRouter = Router();

todoRouter.route("/create").post(HandleTodoCreate);

export default todoRouter;
