// src/index.ts
import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic GET route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to BookLeaf API' });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Simple books route
app.get('/api/books', (req: Request, res: Response) => {
  const books = [
    { id: 1, title: 'The Great Gatsby' },
    { id: 2, title: '1984' },
  ];
  res.json(books);
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});