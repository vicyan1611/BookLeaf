import { Router } from "express";
import FollowController from "../controllers/FollowController";

const followRouter = Router();

followRouter.post("/", FollowController.follow);
followRouter.post("/check", FollowController.checkFollow);

followRouter.get("/test", (req, res) => {
    res.send("Hello World");
});

export default followRouter;