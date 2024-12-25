import { Router } from "express";
import authorizationController from "../controllers/AuthorizationController";

const authorizationRouter = Router();

authorizationRouter.post("/register", authorizationController.register);

export default authorizationRouter;