// BookController.ts
import { Request, Response } from "express";
import BookService from "../services/BookService";
import { error } from "console";

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
    console.log("ID:", id);
    const book = await BookService.getBookByID(id);
    console.log("Book:", book);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  }
  catch(error){
    res.status(500).json({ error: "Failed to fetch book" });
  }
};