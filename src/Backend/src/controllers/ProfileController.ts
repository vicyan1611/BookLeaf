import {Response, Request} from "express";
import { INormalUser, NormalUser } from "../models/NormalUser";

interface ProfileController {
    getProfile: (req: Request, res: Response) => Promise<void>;
}

const ProfileController = {
    getProfile: async (req: Request, res: Response) => {
        try {
            const ID = req.params.ID;
            const profile = await NormalUser.findById(ID);
            if (!profile) {
                res.status(404).json({error: "Profile not found"});
            }
            else{
                profile.password = "";
            }
            req.user!.id = String(req.user!.id);
            req.user!.password = "";
            profile!.id = String(profile!.id);
            res.status(200).json({
                active: req.user,
                viewing: profile 
            });
        } catch (error) {
            res.status(500).json({error: "Failed to fetch profile"});
        }
    }
}

export default ProfileController;