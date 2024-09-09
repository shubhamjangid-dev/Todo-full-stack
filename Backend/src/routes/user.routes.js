import { Router } from "express";
import { HandleUserRegister, HandleUserLogin, HandleUserLogout, getUser } from "../controllers/user.js";
import { verifyTokens } from "../middlewares/AuthMiddleware.js";
const userRouter = Router();

userRouter.route("/register").post(HandleUserRegister);
userRouter.route("/login").post(HandleUserLogin);
userRouter.route("/logout").post(verifyTokens, HandleUserLogout);
userRouter.route("/getUser").post(verifyTokens, getUser);

export default userRouter;
