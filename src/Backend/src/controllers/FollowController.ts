import { Request, Response } from "express";
import { Follow } from "../models/Follow";

interface FollowController {
    follow: (req: Request, res: Response) => Promise<void>;
    checkFollow: (req: Request, res: Response) => Promise<void>;
}

const FollowController = {
    follow: async (req: Request, res: Response) => {
        // follow the user
        const followedID = req.body.followedID;
        const userID = req.user!._id;
        // Follow logic
        const follow = new Follow({
            follower: userID,
            followed: followedID,
            createDate: new Date().toISOString()
        });
        try {
            await follow.save();
            res.status(200).send("Followed successfully");
        } catch (error) {
            console.error("Error following user:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    checkFollow: async (req: Request, res: Response) => {
        // check if the user is following another user
        const followedID = req.body.followedID;
        const userID = req.user!._id;
        try {
            const follow = await Follow.findOne({follower: userID, followed: followedID});
            if (follow) {
                res.status(200).json({
                    isFollowing: true
                })
            } else {
                res.status(200).json({
                    isFollowing: false
                });
            }
        } catch (error) {
            console.error("Error checking follow:", error);
            res.status(500).send("Internal Server Error");
        }
    }
};

export default FollowController;