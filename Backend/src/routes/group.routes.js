import { Router } from "express";
import {
  HandleGroupCreate,
  HandleGroupRename,
  HandleGroupAddMembers,
  HandleGroupRemoveMember,
  HandleGroupJoinGroup,
  HandleGroupResetInviteLink,
  HandleGroupGetGroupProjectData,
  HandleGroupGetGroupInfo,
} from "../controllers/group.js";
import { verifyTokens } from "../middlewares/AuthMiddleware.js";

const groupRouter = Router();

groupRouter.route("/create").post(verifyTokens, HandleGroupCreate);
groupRouter.route("/rename").post(verifyTokens, HandleGroupRename);
groupRouter.route("/add-members").post(verifyTokens, HandleGroupAddMembers);
groupRouter.route("/remove-members").post(verifyTokens, HandleGroupRemoveMember);
groupRouter.route("/join-group").post(verifyTokens, HandleGroupJoinGroup);
groupRouter.route("/reset-invite-link").post(verifyTokens, HandleGroupResetInviteLink);
groupRouter.route("/get-group-project-data").post(verifyTokens, HandleGroupGetGroupProjectData);
groupRouter.route("/get-group-info").post(verifyTokens, HandleGroupGetGroupInfo);

export default groupRouter;
