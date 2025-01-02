import { Router } from "express";
import verify from "../middlewares/verifyToken";
import adminVerify from '../middlewares/adminVerifyToken'
import authorizationRouter from "./AuthorizationRouter";
import profileRouter from "./ProfileRouter";
import bookRouter from "./BookRouter";
import followRouter from "./FollowRouter";
import adminRouter from './AdminRouter';
import AdminController from '../controllers/AdminController';
const apiRouter = Router();

// authenticate and authorize
apiRouter.use("/auth", authorizationRouter);

// admin login API
apiRouter.use("/admin", adminRouter);

// Book API
apiRouter.use("/books", verify, bookRouter);

// Profile API
apiRouter.use("/user-profile", verify, profileRouter);
apiRouter.use('/admin-user-profile', adminVerify, profileRouter);

// Follow API
apiRouter.use("/follow", verify, followRouter);

export default apiRouter;