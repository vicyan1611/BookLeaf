import { Request, Response } from "express";
import { Admin } from "../models/Admin"
import { NormalUser } from "../models/NormalUser";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

interface LoginData {
  username: string;
  password: string;
}

interface AdminController {
  login(req: Request, res: Response): Promise<void>;
  verify(req: Request, res: Response): Promise<void>;
}


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

const AdminController = {
  login: async (req: Request, res: Response): Promise<void> => {
    console.log('admin controller: log in');
    // const salt = bcrypt.genSaltSync(15);
    // const hash = bcrypt.hashSync('Ketamean123@', salt);
    // const acc = new Admin({
    //   email: 'aaa@gmail.com',
    //   username: 'ketamean',
    //   password: hash,
    //   createDate: new Date().toISOString(),
		// 	avatar: "",
    // });
    // await acc.save();
    // res.status(200).json({message: 'Admin created successfully'});
    // return;

    try {
      const data: LoginData = req.body;
      const user = 
        (await Admin.findOne({username: data.username})) ||
        (await Admin.findOne({email: data.username}));
      if (!user) {
        res.status(404).send('Wrong user or password');
        return;
      }
  
      const match = bcrypt.compareSync(data.password, user.password);
  
      if (!match) {
        console.log(data.password)
        res.status(404).send('Wrong user or password');
        return;
      }
      
      const adminAccessToken = _grantToken(user._id, user.username, user.email);
      const adminRefreshToken  = _grantToken(user._id, user.username, user.email);
      res.cookie("adminAccessToken", adminAccessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60,
      }); // 1 day
      res.cookie("adminRefreshToken", adminRefreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 24 * 60 * 60,
      }); // 30 days
  
      res.status(200).send("Admin logged in successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const delRes = await NormalUser.findByIdAndDelete(id);
      console.log(`user ${id} deleted`);
      res.status(200).send('OK');
      return;
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
};

export default AdminController;