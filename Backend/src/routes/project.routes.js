import { Router } from "express";
import { verifyTokens } from "../middlewares/AuthMiddleware.js";
import { HandleProjectCreate, HandleProjectDelete, HandleProjectRename, HandleProjectGetProjectInfo } from "../controllers/project.js";

const projectRouter = Router();

projectRouter.route("/create").post(verifyTokens, HandleProjectCreate);
projectRouter.route("/rename").post(verifyTokens, HandleProjectRename);
projectRouter.route("/delete").post(verifyTokens, HandleProjectDelete);
projectRouter.route("/get-project-info").post(HandleProjectGetProjectInfo);

export default projectRouter;
