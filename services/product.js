const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const paginate = require('../utils/paginate');
const ApiErrorHandler = require('../utils/errorHandler');

// Create a new product
exports.createProduct = asyncHandler(async (req, res, next) => {
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
exports.getAllProducts = asyncHandler(async (req, res, next) => {
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
exports.getProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ApiErrorHandler('Product ID is required', 400));
    }
    const product = await Product.findById(id);
    if (!product) {
        return next(new ApiErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            product,
        },
        message: 'Product retrieved successfully',
    });
})

// Update a product
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ApiErrorHandler('Product ID is required', 400));
    }

    const updates = req.body;
    if (updates.title) {
        updates.slug = slugify(updates.title, { lower: true });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedProduct) {
        return next(new ApiErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            product: updatedProduct,
        },
        message: 'Product updated successfully',
    });
})

// Delete a product
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ApiErrorHandler('Product ID is required', 400));
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        return next(new ApiErrorHandler('Product not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
        message: 'Product deleted successfully',
    });
})