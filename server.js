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
// Category routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const apiV1Router = express.Router();
apiV1Router.use('/categories', categoryRoutes);
apiV1Router.use('/products', productRoutes);

app.use('/api/v1', apiV1Router);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});