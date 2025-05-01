const router = require('express').Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
} = require('../services/product');

// Routes
router.post('/', createProduct); // Create a new product
router.get('/', getAllProducts); // Get all products
router.get('/:id', getProductById); // Get a product by ID

module.exports = router;