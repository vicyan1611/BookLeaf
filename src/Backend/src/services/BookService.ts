import { Request } from "express";
import { Book } from "../models/Book";
import { uploadSupabase } from "../utils/upload.util";
import Metadata from "../utils/book.util";
import { UserBook } from "../models/UserBook";
import { ObjectId } from "mongoose";
interface IBookService {
	getAllBooks: () => Promise<any>;
	getBookByID: (id: string) => Promise<any>;
	uploadBook: (file: Express.Multer.File, userID: any) => Promise<any>;
}

interface IMetadata{
    title?: string;
    publisher?: string;
    description?: string;
    language?: string;
    author?: string;
    date?: string;
    coverImage?: string;
    subjects?: string[];
}

const BookService: IBookService = {
	getAllBooks: async () => {
		try {
			const books = await Book.find().select(
				"title author totalPages pathToCover"
			);
			books.forEach((book) => {
				book.author = (book.author as any)["#text"];
			});
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
		} catch (error) {
			console.error("Error fetching book:", error);
			throw error;
		}
	},
	uploadBook: async (file: any, userID: ObjectId) => {
		try {
			const urls = await uploadSupabase([file]);
			const metadata = await Metadata.getEPUBMetadata(urls[0].publicUrl) as IMetadata;
			const book = new Book({
				title: metadata.title,
				publisher: metadata.publisher,
				description: metadata.description,
				pathToBook: urls[0].publicUrl,
				pathToCover: metadata.coverImage,
				subjects: metadata.subjects,
				author: metadata.author,
				totalPages: 0,
				createdAt: metadata.date ? new Date(metadata.date) : new Date(),
				language: metadata.language,
				userID: userID,
				totalReadingTime: 0,
				lastOpened: null,
			});
			await book.save();
			const userBook = new UserBook({
				userId: userID,
				bookId: book._id,
				currentPage: 0,
			})
			await userBook.save();
		} catch (error) {
			console.error("Error uploading book:", error);
			throw error;
		}
	},
};

export default BookService;
