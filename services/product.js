const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const paginate = require('../utils/paginate');

// Create a new product
exports.createProduct = asyncHandler(async (req, res) => {
    const { title, price, category_id, description } = req.body;
    const newProduct = await Product.create({ title, price, category_id, description });
    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct,
        },
        message: 'Product created successfully',
    });

})

// Get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const paginationResult = await paginate(Product, page, limit);

    res.status(200).json({
        status: 'success',
        data: {
            products: paginationResult.data,
        },
        ...paginationResult,
        message: 'Products retrieved successfully',
    });

});

// Get a single product by ID
exports.getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            status: 'fail',
            message: 'Product ID is required',
            data: []
        });
    }
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found',
            data: []
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            product,
        },
        message: 'Product retrieved successfully',
    });
})