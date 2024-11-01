// Module import 
'use strict'; // Use strict mode, .i.e. variables must be declared before they are used
import express from 'express';
import cors from 'cors'; // Enable CORS for all requests, cross-origin resource sharing
import helmet from 'helmet'; // Secure Express app by setting various HTTP headers
import morgan from 'morgan'; // HTTP request logger middleware
import bodyParser from 'body-parser'; // Parse incoming request bodies. Only parse JSON
import dotenv from 'dotenv'; // Load environment variables from a .env file

// Load environment variables from .env file
dotenv.config();

// Constant
const PORT = process.env.PORT; // express app port

// express app
const app = express();

// Middleware
app.use(cors()) // Enable CORS for all requests, cross-origin resource sharing,
                // .i.e. allow requests from other domains, default is same-origin policy
app.use(bodyParser.urlencoded({ extended: true })); // parse url encoded data using qs library
app.use(bodyParser.json()); // Parse incoming request bodies. Only parse JSON
app.use(helmet()); // Secure Express app by setting various HTTP headers
app.use(morgan('combined')); // HTTP request logger middleware

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Listen to requests on port 3000
});