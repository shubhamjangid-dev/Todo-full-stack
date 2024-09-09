import { Router } from "express";
import { HandleGroupCreate, HandleGroupRename } from "../controllers/group.js";
import { verifyTokens } from "../middlewares/AuthMiddleware.js";

const groupRouter = Router();

groupRouter.route("/create").post(verifyTokens, HandleGroupCreate);
groupRouter.route("/rename").post(verifyTokens, HandleGroupRename);

export default groupRouter;
