import { Request, Response } from "express";
import { Follow } from "../models/Follow";
import { NormalUser } from "../models/NormalUser";

interface FollowController {
  follow: (req: Request, res: Response) => Promise<void>;
  checkFollow: (req: Request, res: Response) => Promise<void>;
  getFollowers: (req: Request, res: Response) => Promise<void>;
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
      createDate: new Date().toISOString(),
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
      const follow = await Follow.findOne({
        follower: userID,
        followed: followedID,
      });
      if (follow) {
        res.status(200).json({
          isFollowing: true,
        });
      } else {
        res.status(200).json({
          isFollowing: false,
        });
      }
    } catch (error) {
      console.error("Error checking follow:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  getFollowers: async (req: Request, res: Response) => {
    const userId = req.user?._id as string;
    console.log(req.user);
    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId query parameter is required" });
    }
    try {
      const follows = await Follow.find({ follower: userId }).exec();
      const followedUserIds = follows.map((follow) => follow.followed);
      const followedUsers = await NormalUser.find({
        _id: { $in: followedUserIds },
      })
        .select("_id username email") // Select only the fields you need
        .exec();
      res.status(200).json({ users: followedUsers });
    } catch (error) {
      console.error("Error getting followers:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default FollowController;
