import { Router } from "express";
import verify from "../middlewares/verifyToken";
import authorizationRouter from "./AuthorizationRouter";
import bookRouter from "./BookRouter";

const apiRouter = Router();

// authenticate and authorize
apiRouter.use("/auth", authorizationRouter);

// Book API
apiRouter.use("/books", verify, bookRouter);

export default apiRouter;