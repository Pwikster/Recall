// Import necessary modules
import express from 'express'; // The core Express framework to handle HTTP requests
import cors from 'cors'; // Middleware to enable CORS (Cross-Origin Resource Sharing)
import dotenv from 'dotenv'; // For loading environment variables from a .env file
import dbConnect from './config/mongoose.config.js'; // Database connection function

// Import routers for handling specific path requests
import userRouter from './routes/user.routes.js';
import locationRouter from './routes/location.routes.js';
import categoryRouter from './routes/category.routes.js';
import itemRouter from './routes/item.routes.js';

// Initialize the express application
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable all CORS requests

// Load environment variables
dotenv.config();

// Get the PORT from environment variables, falling back to a default if it's not specified
const PORT = process.env.PORT || 3000;

// Establish a connection to the database
dbConnect();

// Define routes
// Mount the routers to handle requests starting with '/api'
app.use('/api', userRouter);
app.use('/api', locationRouter);
app.use('/api', categoryRouter);
app.use('/api', itemRouter);

// Start listening on the defined PORT, with a callback to log when the server is running
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
