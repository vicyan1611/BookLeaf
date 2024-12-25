import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { NormalUser } from "../models/NormalUser";

const verify = async (req: Request, res: Response, next: NextFunction) => {
	// Verify jwt
};

export default verify;