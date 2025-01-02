import { Router, Request, Response} from "express";
import AdminController from '../controllers/AdminController';
import { Admin } from "../models/Admin";
import verify from '../middlewares/adminVerifyToken'
const adminRouter = Router();

adminRouter.post('/login', AdminController.login);

adminRouter.get('/', (req: Request, res: Response): void => {
  res.redirect('/api/admin/login');
});

adminRouter.get('/delete-user', verify, (req, res) => {
  res.status(200).send('Allowed');
});
adminRouter.put('/delete-user/:id', verify, AdminController.deleteUser);
// adminRouter.put('/delete-user/:id', AdminController.deleteUser);
adminRouter.post('/logout', AdminController.logout);
adminRouter.get('/verify', verify);

export default adminRouter;