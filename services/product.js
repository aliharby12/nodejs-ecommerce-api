const Product = require('../models/product');

// Create a new product
exports.createProduct = async (req, res) => {
    const { title, price, category_id, description } = req.body;
    try {
        const newProduct = await Product.create({ title, price, category_id, description });
        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct,
            },
            message: 'Product created successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
            data: []
        });
    }
}

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 'success',
            data: {
                products,
            },
            message: 'Products retrieved successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
            data: []
        });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
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
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
            data: []
        });
    }
}