import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
const userRouter = Router();

userRouter.get("/:ID", ProfileController.getProfile);

export default userRouter;