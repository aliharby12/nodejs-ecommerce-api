# Node.js E-commerce API

A RESTful API built with Node.js for managing an e-commerce platform. This project includes features like user authentication, product management, category and brand management, order processing, and more.

## Features

- User authentication and authorization (JWT-based).
- CRUD operations for products, categories, brands, and orders.
- Secure payment integration.
- Pagination and filtering for product listings.
- Error handling and validation.
- Environment-based configuration.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **MongoDB**: Database for storing data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Authentication.
- **dotenv**: Environment variable management.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/nodejs-ecommerce-api.git
    cd nodejs-ecommerce-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and configure the following:
    ```
    NODE_ENV=development
    PORT=3000
    MONGO_DB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login a user.

### Products
- `GET /api/products` - Get all products.
- `POST /api/products` - Add a new product.
- `PUT /api/products/:id` - Update a product.
- `DELETE /api/products/:id` - Delete a product.

### Categories
- `GET /api/categories` - Get all categories.
- `POST /api/categories` - Add a new category.
- `PUT /api/categories/:id` - Update a category.
- `DELETE /api/categories/:id` - Delete a category.

### Brands
- `GET /api/brands` - Get all brands.
- `POST /api/brands` - Add a new brand.
- `PUT /api/brands/:id` - Update a brand.
- `DELETE /api/brands/:id` - Delete a brand.

### Orders
- `GET /api/orders` - Get all orders.
- `POST /api/orders` - Create a new order.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).