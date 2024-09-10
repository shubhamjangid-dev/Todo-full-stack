import { Router } from "express";
import { HandleGroupCreate, HandleGroupRename, HandleGroupAddMembers, HandleGroupRemoveMember } from "../controllers/group.js";
import { verifyTokens } from "../middlewares/AuthMiddleware.js";

const groupRouter = Router();

groupRouter.route("/create").post(verifyTokens, HandleGroupCreate);
groupRouter.route("/rename").post(verifyTokens, HandleGroupRename);
groupRouter.route("/add-members").post(verifyTokens, HandleGroupAddMembers);
groupRouter.route("/remove-members").post(verifyTokens, HandleGroupRemoveMember);

export default groupRouter;
