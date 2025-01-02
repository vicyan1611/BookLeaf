import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { NormalUser, INormalUser } from "../models/NormalUser";
import { config } from "dotenv";

declare global {
  namespace Express {
    interface Request {
      user?: INormalUser;
    }
  }
}
config();

const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.accessToken;
  if (!token) {
    console.log("No token");
    res.status(401).send("Access Denied");
    return;
  }
  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
    const user = await NormalUser.findById(verified.user.id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Error:", err);
    res.status(400).send("Invalid Token");
    return;
  }
};

export default verify;
