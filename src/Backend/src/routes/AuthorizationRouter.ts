import { Router } from "express";
import authorizationController from "../controllers/AuthorizationController";

const authorizationRouter = Router();

authorizationRouter.post("/register", authorizationController.register);
authorizationRouter.post("/login", authorizationController.login);

export default authorizationRouter;