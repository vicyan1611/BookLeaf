import { Router } from "express";
import authorizationRouter from "./AuthorizationRouter";

const apiRouter = Router();

apiRouter.use("/auth", authorizationRouter);

export default apiRouter;