import { Router } from "express";
import { verifyTokens } from "../middlewares/AuthMiddleware.js";
import { HandleProjectCreate, HandleProjectDelete, HandleProjectRename } from "../controllers/project.js";

const projectRouter = Router();

projectRouter.route("/create").post(verifyTokens, HandleProjectCreate);
projectRouter.route("/rename").post(verifyTokens, HandleProjectRename);
projectRouter.route("/delete").post(verifyTokens, HandleProjectDelete);

export default projectRouter;
