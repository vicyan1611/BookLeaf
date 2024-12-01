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
