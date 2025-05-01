const Product = require('../models/product');

// Create a new product
exports.createProduct = async (productData) => {
    try {
        const product = new Product(productData);
        await product.save();
        return { status: 'success', data: product, message: 'Product created successfully' };
    } catch (error) {
        return { status: 'fail', message: error.message, data: [] };
    }
};

// Get all products
exports.getAllProducts = async () => {
    try {
        const products = await Product.find();
        return { status: 'success', data: products, message: 'Products retrieved successfully' };
    } catch (error) {
        return { status: 'fail', message: error.message, data: [] };
    }
};

// Get a single product by ID
exports.getProductById = async (productId) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return { status: 'fail', message: 'Product not found', data: [] };
        }
        return { status: 'success', data: product, message: 'Product retrieved successfully' };
    } catch (error) {
        return { status: 'fail', message: error.message, data: [] };
    }
};