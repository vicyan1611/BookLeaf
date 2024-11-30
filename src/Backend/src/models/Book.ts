import mongoose, { Schema, Document } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  totalPages: number;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  totalPages: { type: Number, required: true },
});

export const Book = mongoose.model<IBook>("Book", BookSchema);
