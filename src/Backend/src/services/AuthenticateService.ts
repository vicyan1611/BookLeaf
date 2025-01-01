import { adder } from "./../models/MetadataHandler/MetaAdder";
import { Request, Response } from "express";
import { INormalUser, NormalUser } from "../models/NormalUser";
import { IVerification, Verification } from "../models/Verification";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import sendVerificationCode from "../utils/mail.util";
const saltRounds = 15;
configDotenv();

interface IAuthenticationService {
	login: (req: Request, res: Response) => Promise<void>;
	register: (req: Request, res: Response) => Promise<void>;
	emailVerify: (req: Request, res: Response) => Promise<void>;
	OTPVerify: (req: Request, res: Response) => Promise<void>;
	accountVerify: (req: Request, res: Response) => Promise<void>;
	sendVerificationEmail: (req: Request, res: Response) => Promise<void>;
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
	password: string;
}

interface LoginData {
	username: string;
	password: string;
}

const AuthService: IAuthenticationService = {
	login: async (req: Request<{}, {}, LoginData>, res: Response) => {
		try {
			// Login logic
			const data = req.body;
			const user =
				(await NormalUser.findOne({ username: data.username })) ||
				(await NormalUser.findOne({ email: data.username }));
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
			const refreshToken = jwt.sign(
				{
					user: {
						id: user._id,
						username: user.username,
						email: user.email,
					},
				},
				process.env.JWT_SECRET as Secret,
				{ expiresIn: "30 days" }
			); // long-lived token
			res.cookie("accessToken", accessToken, {
				httpOnly: true,
				secure: false,
				maxAge: 24 * 60 * 60,
			}); // 1 day
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: false,
				maxAge: 30 * 24 * 60 * 60,
			}); // 30 days
			res.status(200).send("User logged in successfully");
		} catch (error) {
			console.log(error);
			res.status(500).send("Internal Server Error");
		}
	},
	register: async (req: Request<{}, {}, RegisterData>, res: Response) => {
		try {
			const data = req.body;
			const existed =
				(await NormalUser.findOne({ email: data.email })) ||
				(await NormalUser.findOne({ username: data.username }));
			if (existed) {
				res.status(409).send("User already exists");
				return;
			}
			const salt = bcrypt.genSaltSync(saltRounds);
			const hash = bcrypt.hashSync(data.password, salt);
			const user: INormalUser = new NormalUser({
				email: data.email,
				username: data.username,
				password: hash,
				createDate: new Date().toISOString(),
				avatar: "",
				verified: false,
			});
			await user.save();
			res.status(200).send(
				"User registered successfully, please verify your email"
			);
		} catch (error: any) {
			console.log(error);
			res.status(500).send("Internal Server Error");
		}
	},
	emailVerify: async (req: Request, res: Response) => {
		const email = req.body.email;
		const user = await NormalUser.findOne({ email: email });
		if (!user) {
			res.status(404).send("User not found");
			return;
		}
		const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
		const verification: IVerification = new Verification({
			email: email,
			OTP: code,
			createDate: new Date().toISOString(),
			expireDate: new Date(Date.now() + 1000 * 60 * 15).toISOString(), // 15 minutes
			type: "reset-password",
			used: false,
		});
		await verification.save();
		sendVerificationCode(email, code);
		res.status(200).send("Email sent");
	},
	OTPVerify: async (req: Request, res: Response) => {
		const email = req.body.email;
		const code = req.body.code;
		const verification = await Verification.findOne({
			email: email,
			OTP: code,
			used: false,
			type: "reset-password",
			expireDate: { $gt: new Date().toISOString() },
		});
		if (!verification) {
			res.status(400).send("Invalid code or code may have expired");
			return;
		}
		verification.used = true;
		await verification.save();
		const associatedUser = await NormalUser.findOne({
			email: email,
		});
		if (!associatedUser) {
			res.status(404).send("User not found");
			return;
		}
		res.status(200).send("Email verified");
	},
	accountVerify: async (req: Request, res: Response) => {
		const code = req.body.code;
		const email = req.body.email;
		const verification = await Verification.findOne({
			email: email,
			OTP: code,
			used: false,
			type: "account-verification",
			expireDate: { $gt: new Date().toISOString() },
		});
		if (!verification) {
			res.status(400).send("Invalid code or code may have expired");
			return;
		}
		verification.used = true;
		await verification.save();
		const associatedUser = await NormalUser.findOne({
			email: email,
		});
		if (!associatedUser) {
			res.status(404).send("User not found");
			return;
		}
		associatedUser.verified = true;
		await associatedUser.save();
		res.status(200).send("Email verified");
	},
	sendVerificationEmail: async (req: Request, res: Response) => {
		const email = req.body.email;
		const user = await NormalUser.findOne({ email: email });
		if (!user) {
			res.status(404).send("User not found");
			return;
		} else if (user.verified) {
			res.status(200).send("User already verified");
			return;
		}
		const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
		const verification: IVerification = new Verification({
			email: email,
			OTP: code,
			createDate: new Date().toISOString(),
			expireDate: new Date(Date.now() + 1000 * 60 * 15).toISOString(), // 15 minutes
			type: "account-verification",
			used: false,
		});
		await verification.save();
		sendVerificationCode(email, code);
		res.status(200).send("Email sent");
	},
	resetPassword: async (
		req: Request<{}, {}, ResetPasswordData>,
		res: Response
	) => {
		const email = req.body.email;
		const user = await NormalUser.findOne({ email: email });
		if (!user) {
			res.status(404).send("User not found");
			return;
		} else if (bcrypt.compareSync(req.body.password, user.password)) {
			res.status(400).send(
				"New password cannot be the same as the old password"
			);
			return;
		}
		try {
			const password = req.body.password;
			const salt = bcrypt.genSaltSync(saltRounds);
			const hash = bcrypt.hashSync(password, salt);
			user.password = hash;
			await user.save();
			res.status(200).send("Password reset successfully");
		} catch (error) {
			console.log(error);
			res.status(500).send("Internal Server Error");
		}
	},
	verify: async (req: Request, res: Response) => {
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
			} else {
				console.log("No token found");
				res.status(401).send("No token found");
			}
		}
	},
};

export default AuthService;
