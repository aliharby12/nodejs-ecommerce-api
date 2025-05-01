const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Handle .env variables
dotenv.config({ path: './config.env' });

// Database connection
const dbConnection = require('./config/database');
dbConnection();

// Express app
const app = express();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Mode is: ${process.env.NODE_ENV} mode`);
}

const PORT = process.env.PORT || 3000;

// Routes
const categoryRoutes = require('./routes/category');
app.use('/api/v1/categories', categoryRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});