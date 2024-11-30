import { Book } from "../models/Book";

interface IBookService {
  getAllBooks: () => Promise<any>;
}

const BookService: IBookService = {
  getAllBooks: async () => {
    try {
      const books = await Book.find().select("title author totalPages");
      return books;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },
};

export default BookService;
