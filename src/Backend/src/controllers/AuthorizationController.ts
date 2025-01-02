import { Request, Response } from "express";
import AuthService from "../services/AuthenticateService";

interface AuthorizationController {
	login: (req: Request, res: Response) => Promise<void>;
	verify: (req: Request, res: Response) => Promise<void>;
	register: (req: Request, res: Response) => Promise<void>;
	emailVerify: (req: Request, res: Response) => Promise<void>;
	OTPVerify: (req: Request, res: Response) => Promise<void>;
	accountVerify: (req: Request, res: Response) => Promise<void>;
	sendVerificationEmail: (req: Request, res: Response) => Promise<void>;
	resetPassword: (req: Request, res: Response) => Promise<void>;
	logout: (req: Request, res: Response) => Promise<void>;
	changePassword: (req: Request, res: Response) => Promise<void>;
	adminVerify: (req: Request, res: Response) => Promise<void>;
}

const AuthorizationController: AuthorizationController = {
	login: async (req: Request, res: Response) => {
		try {
			await AuthService.login(req, res);
		} catch (error) {
			res.status(500).json({ error: "Failed to login" });
		}
	},
	verify: async (req: Request, res: Response) => {
		try {
			await AuthService.verify(req, res);
		} catch (error) {
			res.status(500).json({ error: "Failed to verify" });
		}
	},
	register: async (req: Request, res: Response) => {
		try {
			await AuthService.register(req, res);
		} catch (error) {
			res.status(500).json({ error: "Failed to register" });
		}
	},
	emailVerify: async (req: Request, res: Response) => {
		try {
			await AuthService.emailVerify(req, res);
		} catch (error) {
			res.status(500).json({ error: "Failed to verify email" });
		}
	},
	OTPVerify: async (req: Request, res: Response) => {
		try {
			await AuthService.OTPVerify(req, res);
		} catch (error) {
			res.status(500).json({ error: "Failed to verify OTP" });
		}
	},

	accountVerify: async (req: Request, res: Response) => {
		try {
			await AuthService.accountVerify(req, res);
		} catch (error) {
			res.status(500).json({ error: "Failed to verify account" });
		}
	},

	sendVerificationEmail: async (req: Request, res: Response) => {
		try {
			await AuthService.sendVerificationEmail(req, res);
		} catch (error) {
			res.status(500).json({
				error: "Failed to send verification email",
			});
		}
	},

	resetPassword: async (req: Request, res: Response) => {
		try {
			await AuthService.resetPassword(req, res);
		} catch (error) {
			res.status(500).json({ error: "Failed to reset password" });
		}
	},

	logout: async (req: Request, res: Response) => {
		try {
			await AuthService.logout(req, res);
		} catch (error) {
			res.status(500).json({ error: "Failed to logout" });
		}
	},

	changePassword: async (req: Request, res: Response) => {
		try {
			await AuthService.changePassword(req, res);
		} catch (error) {
			res.status(500).json({ error: "Failed to change password" });
		}
	}
};

export default AuthorizationController;