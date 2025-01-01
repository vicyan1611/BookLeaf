import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: Object;
  totalPages: number;
  description: string;
  pathToBook: string;
  pathToCover: string;
  subjects: string[];
  language: string;
  publisher: string;
  createdAt: Date;
  userID: string;
  totalReadingTime: number; // in minutes
  lastOpened: Date;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: Object, required: false },
  totalPages: { type: Number, required: false },
  description: { type: String, required: false },
  pathToBook: { type: String, required: true },
  pathToCover: { type: String, required: false },
  subjects: { type: [String], required: false },
  language: { type: String, required: false },
  publisher: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  userID: { type: String, required: true },
  totalReadingTime: { type: Number, required: false },
  lastOpened: { type: Date, required: false },
});
// Still haven't found a way to read author and total page metadata

export const Book = mongoose.model<IBook>("Book", BookSchema);