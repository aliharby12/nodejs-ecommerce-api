const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

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
    const products = await Product.find();
    if (!products || products.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'No products found',
            data: []
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            products,
        },
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