// src/scripts/setupDatabase.ts
import mongoose from "mongoose";
import { Book } from "../models/Book";

const MONGODB_URI = "mongodb://localhost:27017/bookleaf";

const sampleBooks = [
  {
    title: "Con chim xanh biếc bay về",
    author: "Nguyễn Nhật Ánh",
    totalPages: 258,
    description: "A heartwarming story about love, family, and self-discovery",
    pathToBook: "/storage/books/conchimxanh.pdf",
    pathToCover: "/storage/covers/conchimxanh.jpg",
  },
  {
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    totalPages: 320,
    description: "How to Win Friends and Influence People in Vietnamese",
    pathToBook: "/storage/books/dacnhantam.pdf",
    pathToCover: "/storage/covers/dacnhantam.jpg",
  },
  {
    title: "Rừng Xà Nu",
    author: "Nguyễn Trung Thành",
    totalPages: 150,
    description: "A story about resistance and bravery during wartime",
    pathToBook: "/storage/books/rungxanu.pdf",
    pathToCover: "/storage/covers/rungxanu.jpg",
  },
];

async function setupDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    // Check if books collection already has documents
    await mongoose.connection
      .collection("books")
      .drop()
      .catch(() => {
        console.log("No existing books collection to drop");
      });

    // Insert sample books
    const insertedBooks = await Book.insertMany(sampleBooks);
    console.log(`Successfully inserted ${insertedBooks.length} books`);

    // Display inserted books
    console.log("\nInserted books:");
    insertedBooks.forEach((book) => {
      console.log(
        `- ${book.title} by ${book.author} (${book.totalPages} pages)`
      );
    });

    await mongoose.disconnect();
    console.log("\nDatabase setup completed successfully");
  } catch (error) {
    console.error("Error setting up database:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
