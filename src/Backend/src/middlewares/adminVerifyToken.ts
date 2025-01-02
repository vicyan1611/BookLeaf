import { config } from "dotenv";;
import {Admin} from '../models/Admin';
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const _grantToken = (id: string, username: string, email: string) => {
  return jwt.sign(
    {
      user: {
        id,
        username,
        email,
        isAdmin: true
      },
    },
    process.env.JWT_SECRET as Secret,
    { expiresIn: "1 days" }
  ); // short-lived token
}

const verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const adminAccessToken: string | undefined = req.cookies.adminAccessToken;
    const adminRefreshToken: string | undefined = req.cookies.adminRefreshToken;
    if (!adminAccessToken && !adminRefreshToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    if (adminAccessToken) {
      jwt.verify(adminAccessToken, process.env.JWT_SECRET as Secret, (err: any, decoded: any) => {
        if (err || !decoded.user.isAdmin) {
          jwt.verify(adminRefreshToken, process.env.JWT_SECRET as Secret, async (err: any, decoded: any) => {
            if (err || !decoded.user.isAdmin) {
              res.status(401).send("Unauthorized");
              return;
            }
            const user = await Admin.findOne({_id: decoded.user.id});
            if (!user) {
              res.status(401).send("Unauthorized");
              return;
            }
            const newAccessToken = _grantToken(decoded.user.id, decoded.user.username, decoded.user.email);
            const newRefreshToken = _grantToken(decoded.user.id, decoded.user.username, decoded.user.email);
            res.cookie("adminAccessToken", newAccessToken, {
              httpOnly: true,
              secure: false,
              maxAge: 24 * 60 * 60,
            });
            res.cookie("adminRefreshToken", newRefreshToken, {
              httpOnly: true,
              secure: false,
              maxAge: 30 * 24 * 60 * 60,
            });
            res.status(200);
            next();
            return;
          })
        }
        res.status(200);
        next();
        return;
      });
    } else {
      jwt.verify(adminRefreshToken, process.env.JWT_SECRET as Secret, async (err: any, decoded: any) => {
        if (err || !decoded.user.isAdmin) {
          res.status(401).send("2Unauthorized");
          return;
        }
        const user = await Admin.findOne({_id: decoded.user.id});
        if (!user) {
          res.status(401).send("3Unauthorized");
          return;
        }
        const newAccessToken = _grantToken(decoded.user.id, decoded.user.username, decoded.user.email);
        const newRefreshToken = _grantToken(decoded.user.id, decoded.user.username, decoded.user.email);
        res.cookie("adminAccessToken", newAccessToken, {
          httpOnly: true,
          secure: false,
          maxAge: 24 * 60 * 60,
        });
        res.cookie("adminRefreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 30 * 24 * 60 * 60,
        });
        res.status(200);
        next();
        return;
      })
    }

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
    return;
  }
}

export default verify;