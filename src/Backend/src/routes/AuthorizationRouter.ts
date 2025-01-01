import { Router, Request, Response} from "express";
import AuthorizationController from "../controllers/AuthorizationController";
import verify from "../middlewares/verifyToken";

const authorizationRouter = Router();

authorizationRouter.post("/register", AuthorizationController.register);
authorizationRouter.post("/login", AuthorizationController.login);
authorizationRouter.post("/reset-password/verify-email", AuthorizationController.emailVerify);
authorizationRouter.post("/reset-password/verify-OTP", AuthorizationController.OTPVerify);
authorizationRouter.put("/reset-password", AuthorizationController.resetPassword);
authorizationRouter.post("/verify", AuthorizationController.verify);
authorizationRouter.post("/send-verification-mail", AuthorizationController.sendVerificationEmail);
authorizationRouter.post("/verify-account", AuthorizationController.accountVerify);
authorizationRouter.post("/logout", AuthorizationController.logout);

authorizationRouter.get("/test", verify, (req: Request, res: Response): void => {
    res.send("Hello World");
});
export default authorizationRouter;