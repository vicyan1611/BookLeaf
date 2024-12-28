import { Router } from "express";
import authorizationController from "../controllers/AuthorizationController";

const authorizationRouter = Router();

authorizationRouter.post("/register", authorizationController.register);
authorizationRouter.post("/login", authorizationController.login);
authorizationRouter.post("/reset-password/verify-email", authorizationController.emailVerify);
authorizationRouter.post("/reset-password/verify-OTP", authorizationController.OTPVerify);
authorizationRouter.put("/reset-password", authorizationController.resetPassword);
authorizationRouter.post("/verify", authorizationController.verify);
export default authorizationRouter;