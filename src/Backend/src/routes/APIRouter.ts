import { Router } from "express";
import verify from "../middlewares/verifyToken";
import authorizationRouter from "./AuthorizationRouter";

const apiRouter = Router();

apiRouter.use("/auth", authorizationRouter);

export default apiRouter;