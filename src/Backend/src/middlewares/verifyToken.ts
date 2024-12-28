import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { NormalUser } from "../models/NormalUser";

const verify = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.accessToken;
	if (!token) {
		res.status(401).send("Access Denied");
	}
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET as Secret) as JwtPayload;
		const user = await NormalUser.findById(verified.user.id);
		if (!user) {
			res.status(404).send("User not found");
		}
		req.body.user = user;
		next();
	} catch (err) {
		res.status(400).send("Invalid Token");
	}
};

export default verify;