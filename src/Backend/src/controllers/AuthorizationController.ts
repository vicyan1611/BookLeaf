import { Request, Response } from "express";
import { mongo } from "mongoose";
import { INormalUser, NormalUser } from "../models/NormalUser";
import bcrypt from "bcrypt";
const saltRounds = 15;
interface AuthorizationControllerType {
	login: (req: Request, res: Response) => Promise<void>;
	register: (req: Request, res: Response) => Promise<void>;
	resetPassword: (req: Request, res: Response) => Promise<void>;
}

interface RegisterData {
	email: string;
	username: string;
	password: string;
}

interface ResetPasswordData {
	email: string;
}

interface LoginData {
	username: string;
	password: string;
}

const AuthorizationController: AuthorizationControllerType = {
	login: async (req: Request<{}, {}, LoginData>, res: Response) => {
		try{
			const data = req.body;
			const user = await NormalUser.findOne({username: data.username}) || await NormalUser.findOne({email: data.username});
			if (!user) {
				res.status(404).send("User not found");
				return;
			}
			const match = bcrypt.compareSync(data.password, user.password);
			if (!match) {
				res.status(401).send("Wrong credentials");
				return;
			}
			res.status(200).send("User logged in successfully");
		}
		catch(error){
			console.log(error);
			res.status(500).send("Internal Server Error");
		}
	},
	register: async (req: Request<{}, {}, RegisterData>, res: Response) => {
		try {
			const data = req.body;
			const existed = await NormalUser.findOne({email: data.email}) || await NormalUser.findOne({username: data.username});
			if (existed) {
				res.status(409).send("User already exists");
				return
			}
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(data.password, salt);
			const user: INormalUser = new NormalUser({
                email: data.email,
                username: data.username,
                password: hash,
                createDate: new Date().toISOString(),
                avatar: ""
            });
            await user.save();
			res.status(200).send("User registered successfully");
		} catch (error: any) {
			console.log(error);
			res.status(500).send("Internal Server Error");
		}
	},
	resetPassword: async (req: Request, res: Response) => {
		// Your reset password logic here
	},
};

export default AuthorizationController;
