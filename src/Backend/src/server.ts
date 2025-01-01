import express, { Express, Request, Response } from "express";
require("dotenv").config();
import cors from "cors";
import { connectMongoDB } from "./config/config";
import apiRouter from "./routes/APIRouter";
import cookieParser from 'cookie-parser';

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
app.use(cookieParser());

connectMongoDB();

// set static folder
app.use(express.static('public'));

// Basic GET route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to BookLeaf API" });
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// API Router
app.use('/api', apiRouter);

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
