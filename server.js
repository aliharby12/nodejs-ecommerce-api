const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const ApiErrorHandler = require('./utils/errorHandler');
const errorHandler = require('./middlewares/errorHandler');
const { authenticate } = require('./middlewares/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

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
const brandRoutes = require('./routes/brand');
const authRoutes = require('./routes/auth');

const apiV1Router = express.Router();
apiV1Router.use('/categories', authenticate, categoryRoutes);
apiV1Router.use('/products', authenticate, productRoutes);
apiV1Router.use('/brands', authenticate, brandRoutes);
apiV1Router.use('/auth', authRoutes);

app.use('/api/v1', apiV1Router);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
    });
    server.close(() => {
        console.error('Server shutting down due to unhandled promise rejection ...');
        process.exit(1);
    });
});