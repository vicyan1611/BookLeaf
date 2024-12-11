import express, { Express, Request, Response } from "express";
require("dotenv").config();
import cors from "cors";
import { connectMongoDB } from "./config/config";
import { getAllBooks, getBookByID } from "./controllers/BookController";
import morgan from "morgan";
import { UserController } from './controllers/UserController'

console.log(process.env.PORT)
const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies
};

app.use(cors(corsOptions));
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

app.post('/login', UserController.post);

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
