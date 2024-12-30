import { Router, Request, Response} from "express";
import authorizationController from "../controllers/AuthorizationController";
import verify from "../middlewares/verifyToken";

const authorizationRouter = Router();

authorizationRouter.post("/register", authorizationController.register);
authorizationRouter.post("/login", authorizationController.login);
authorizationRouter.post("/reset-password/verify-email", authorizationController.emailVerify);
authorizationRouter.post("/reset-password/verify-OTP", authorizationController.OTPVerify);
authorizationRouter.put("/reset-password", authorizationController.resetPassword);
authorizationRouter.post("/verify", authorizationController.verify);
authorizationRouter.post("/send-verification-mail", authorizationController.sendVerificationEmail);
authorizationRouter.post("/verify-account", authorizationController.accountVerify);


authorizationRouter.get("/test", verify, (req: Request, res: Response): void => {
    res.send("Hello World");
});
export default authorizationRouter;