import express, { Express, Request, Response } from "express";
require("dotenv").config();
import cors from "cors";
import { connectMongoDB } from "./config/config";
import { getAllBooks, getBookByID } from "./controllers/BookController";
import morgan from "morgan";
console.log(process.env.PORT)
const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

connectMongoDB();

// Basic GET route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to BookLeaf API" });
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/api/books/:bookID", getBookByID);

// Simple books route
app.get("/api/books", getAllBooks);

app.post('/login', (req, res) => {
  const username = req.body.username || null
  const password = req.body.password || null
  if (!username || !password) {
    res.status(401).send('Invalid username or password')
  }
})

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
