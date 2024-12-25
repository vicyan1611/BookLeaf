import { Request, Response } from "express";
import { mongo } from "mongoose";
import { INormalUser, NormalUser } from "../models/NormalUser";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
const saltRounds = 15;
configDotenv();
interface AuthorizationControllerType {
	login: (req: Request, res: Response) => Promise<void>;
	register: (req: Request, res: Response) => Promise<void>;
	resetPassword: (req: Request, res: Response) => Promise<void>;
	verify: (req: Request, res: Response) => Promise<void>;
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
			// Login logic
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
			// Sending the token
			const accessToken = jwt.sign({user: {
				id: user._id,
				username: user.username,
				email: user.email
			}}, process.env.JWT_SECRET as Secret, {expiresIn: '1 days'}); // short-lived token
			const refreshToken = jwt.sign({user: {
				id: user._id,
				username: user.username,
				email: user.email
			}}, process.env.JWT_SECRET as Secret, {expiresIn: '30 days'}); // long-lived token
			res.cookie('accessToken', accessToken, {httpOnly: true, secure: false, maxAge: 24 * 60 * 60}); // 1 day
			res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: false, maxAge: 30 * 24 * 60 * 60}); // 30 days
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
	verify: async (req: Request, res: Response) => {
		console.log(req.cookies);
		if (req.cookies) {
			const accessCookieToken = req.cookies.accessToken;
			const refreshCookieToken = req.cookies.refreshToken;
			if (accessCookieToken || refreshCookieToken) {
				try {
					if (accessCookieToken) {
						// Verify token logic
						const decoded = jwt.verify(
							accessCookieToken,
							process.env.JWT_SECRET as Secret
						) as JwtPayload;
						if (decoded.exp && decoded.exp * 1000 < Date.now()) {
							// Token expired. JWT expiry is in seconds, Date.now() is in milliseconds
							res.clearCookie("accessToken");
							res.clearCookie("refreshToken");
							res.status(401).send("Token expired");
							return;
						}
						const user = await NormalUser.findById(decoded.user.id);
						if (user) {
							res.status(200).send("User verified");
							return;
						} else {
							res.clearCookie("accessToken");
							res.clearCookie("refreshToken");
							res.status(401).send("User not found");
						}
					} else if (refreshCookieToken) {
						// Refresh token logic
						const decoded = jwt.verify(
							refreshCookieToken,
							process.env.JWT_SECRET as Secret
						) as JwtPayload;
						const user = await NormalUser.findById(decoded.user.id);
						if (user) {
							const accessToken = jwt.sign(
								{
									user: {
										id: user._id,
										username: user.username,
										email: user.email,
									},
								},
								process.env.JWT_SECRET as Secret,
								{ expiresIn: "1 days" }
							); // short-lived token
							res.cookie("accessToken", accessToken, {
								httpOnly: true,
								secure: false,
							});
							res.redirect("/");
							return;
						} else {
							res.clearCookie("accessToken");
							res.clearCookie("refreshToken");
							res.status(401).send("User not found");
						}
					}
				} catch (error) {
					res.clearCookie("accessToken");
					res.clearCookie("refreshToken");
					res.status(401).send("Invalid token");
				}
			}
			else{
				console.log("No token found");
				res.status(401).send("No token found");
			}
		}
	},
};

export default AuthorizationController;
