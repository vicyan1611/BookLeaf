import { Router } from "express";
import verify from "../middlewares/verifyToken";
import authorizationRouter from "./AuthorizationRouter";
import profileRouter from "./ProfileRouter";
import bookRouter from "./BookRouter";
import followRouter from "./FollowRouter";

const apiRouter = Router();

// authenticate and authorize
apiRouter.use("/auth", authorizationRouter);

// Book API
apiRouter.use("/books", verify, bookRouter);

// Profile API
apiRouter.use("/user-profile", verify, profileRouter);

// Follow API
apiRouter.use("/follow", verify, followRouter);

export default apiRouter;