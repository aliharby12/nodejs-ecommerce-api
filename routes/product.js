const router = require('express').Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
} = require('../services/product');

// Routes
router.post('/', createProduct).get('/', getAllProducts).get('/:id', getProductById);

module.exports = router;