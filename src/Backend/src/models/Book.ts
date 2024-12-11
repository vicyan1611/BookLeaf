import mongoose, { Schema, Document } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  totalPages: number;
  description: string;
  pathToBook: string;
  pathToCover: string;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  totalPages: { type: Number, required: true },
  description: { type: String },
  pathToBook: { type: String, required: true },
  pathToCover: { type: String, required: true },
});

export const Book = mongoose.model<IBook>("Book", BookSchema);
