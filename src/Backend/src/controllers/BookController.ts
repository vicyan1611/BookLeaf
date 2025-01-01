// BookController.ts
import { Request, Response } from "express";
import BookService from "../services/BookService";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await BookService.getAllBooks(); // Delegates to service
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

export const getBookByID = async (req: Request, res: Response) => {
  try{
    const id = req.params.bookID;
    const book = await BookService.getBookByID(id);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  }
  catch(error){
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

export const uploadBook = async (req: Request, res: Response) => {
  try {
    // Upload logic
    const file = req.file;
    const userID = req.user!._id;
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }
    await BookService.uploadBook(file, userID);
    res.status(200).send("Book uploaded successfully");
  } catch (error) {
    console.error("Error uploading book:", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getBookByUserID = async (req: Request, res: Response) => {
  try {
    const userBooks = await BookService.getBookByUserID(req);
    res.status(200).json(userBooks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user books" });
  }
};