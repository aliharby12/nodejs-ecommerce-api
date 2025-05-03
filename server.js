const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const ApiErrorHandler = require('./utils/errorHandler');

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
// Category routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const apiV1Router = express.Router();
apiV1Router.use('/categories', categoryRoutes);
apiV1Router.use('/products', productRoutes);

app.use('/api/v1', apiV1Router);

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is running',
    });
});

// 404 handler (should be after all other routes)
app.use((req, res, next) => {
    const err = new ApiErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404);
    next(err);
});

// Error-handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});