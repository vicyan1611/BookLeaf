import { Router } from "express";
import authorizationController from "../controllers/AuthorizationController";

const authorizationRouter = Router();

authorizationRouter.post("/register", authorizationController.register);
authorizationRouter.post("/login", authorizationController.login);
authorizationRouter.put("/reset-password", authorizationController.resetPassword);
authorizationRouter.post("/verify", authorizationController.verify);
export default authorizationRouter;