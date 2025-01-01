import { Router } from "express";
const verifyRouter = Router();
import bookRouter from './BookRouter'

verifyRouter.get('/', (req, res) => {
  res.redirect('/login');
})
verifyRouter.use('/books', bookRouter);

export default verifyRouter;