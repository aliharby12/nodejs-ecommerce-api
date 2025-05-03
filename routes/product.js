const router = require('express').Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../services/product');

// Routes
router.post('/', createProduct)
    .get('/', getAllProducts)
    .get('/:id', getProductById)
    .patch('/:id', updateProduct)
    .delete('/:id', deleteProduct);

module.exports = router;