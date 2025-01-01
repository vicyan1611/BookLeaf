import { Router } from "express";
import { getAllBooks, getBookByID, uploadBook, getBookByUserID} from "../controllers/BookController";
import upload from "../utils/upload.util";
const bookRouter = Router();

bookRouter.get("/:bookID", getBookByID);
bookRouter.get("/", getAllBooks);
bookRouter.post("/upload", upload.single("file"), uploadBook);
bookRouter.post("/getUserBooks", getBookByUserID);

export default bookRouter;