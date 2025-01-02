import { Response, Request } from "express";
import { NormalUser } from "../models/NormalUser";

interface ProfileController {
  getProfile: (req: Request, res: Response) => Promise<void>;
  searchProfiles: (req: Request, res: Response) => Promise<void>;
  getMyProfileID: (req: Request, res: Response) => Promise<void>;
}

const ProfileController = {
  getProfile: async (req: Request, res: Response) => {
    try {
      const ID = req.params.ID;
      const profile = await NormalUser.findById(ID);
      if (!profile) {
        res.status(404).json({ error: "Profile not found" });
      } else {
        profile.password = "";
      }
      req.user!.id = String(req.user!.id);
      req.user!.password = "";
      profile!.id = String(profile!.id);
      res.status(200).json({
        active: req.user,
        viewing: profile,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  },
  searchProfiles: async (req: Request, res: Response) => {
    console.log("Searching profiles");
    let searchQuery = req.query.search as string;
    if (typeof searchQuery !== "string") {
      return res.status(400).json({ error: "Invalid search query" });
    }
    if (!searchQuery) {
      try {
        return res.status(200).json({ users: [] });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch users" });
      }
    }
    try {
      const users = await NormalUser.find({
        username: { $regex: searchQuery, $options: "i" },
      })
        .select("username _id email")
        .exec();
      res.status(200).json({ users });
    } catch (error) {
      console.error("Error searching users:", error);
      res.status(500).json({ error: "Failed to search users" });
    }
  },
  getMyProfileID: (req: Request, res: Response) => {
    console.log("Fetching my profile ID");
    try {
      console.log(req.user!._id as string);
      res.status(200).json({ id: req.user!._id });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  },
};

export default ProfileController;
