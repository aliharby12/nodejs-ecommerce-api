const router = require('express').Router();
const {
    createProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator,
    getAllProductValidator,
} = require('../utils/productValidator');

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../services/product');

// Routes
router.route('/')
    .post(
        createProductValidator, createProduct
    )
    .get(getAllProductValidator, getAllProducts);

router.route('/:id')
    .get(
        getProductValidator, getProductById
    )
    .patch(
        updateProductValidator, updateProduct
    )
    .delete(
        deleteProductValidator, deleteProduct
    );

module.exports = router;