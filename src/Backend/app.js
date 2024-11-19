'use strict';
const express = require('express'); // Express web server framework
const cors = require('cors') // Enable CORS for all requests, cross-origin resource sharing
const bodyParser = require('body-parser'); // Parse incoming request bodies. Only parse JSON
const dotenv = require('dotenv'); // Load environment variables from .env file
const helmet = require('helmet'); // Secure Express app by setting various HTTP headers
const morgan = require('morgan'); // HTTP request logger middleware

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