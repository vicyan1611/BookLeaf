import { getBookByID } from './../controllers/BookController';
import { Book } from "../models/Book";

interface IBookService {
  getAllBooks: () => Promise<any>;
  getBookByID: (id: string) => Promise<any>;
}

const BookService: IBookService = {
  getAllBooks: async () => {
    try {
      const books = await Book.find().select(
        "title author totalPages pathToCover"
      );
      return books;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },
  getBookByID: async (id: string) => {
    try {
      const book = await Book.findById(id);
      return book;
    }
    catch (error) {
      console.error("Error fetching book:", error);
      throw error;
    }
  }
};

export default BookService;
