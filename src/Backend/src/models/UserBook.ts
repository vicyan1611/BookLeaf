import mongoose, { Schema, Document } from "mongoose";

interface IUserBook extends Document {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  currentPage: number;
}

const UserBookSchema = new Schema<IUserBook>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  currentPage: { type: Number, default: 1 },
});

export const UserBook = mongoose.model<IUserBook>("UserBook", UserBookSchema);
