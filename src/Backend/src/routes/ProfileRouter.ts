import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
const userRouter = Router();

userRouter.get("/myid", ProfileController.getMyProfileID);

userRouter.get("/:ID", ProfileController.getProfile);

userRouter.get("/", ProfileController.searchProfiles);

export default userRouter;
