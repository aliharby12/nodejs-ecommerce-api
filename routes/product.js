const router = require('express').Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
} = require('../services/product');

// Routes
router.post('/', createProduct).get('/', getAllProducts).get('/:id', getProductById).patch('/:id', updateProduct);

module.exports = router;