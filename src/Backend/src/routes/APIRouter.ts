import { Router } from "express";
import verify from "../middlewares/verifyToken";
import authorizationRouter from "./AuthorizationRouter";
import profileRouter from "./ProfileRouter";
import bookRouter from "./BookRouter";

const apiRouter = Router();

// authenticate and authorize
apiRouter.use("/auth", authorizationRouter);

// Book API
apiRouter.use("/books", verify, bookRouter);

// Profile API
apiRouter.use("/user-profile", verify, profileRouter);

export default apiRouter;
