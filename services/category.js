const Category = require('../models/category');

exports.createCategory = async (req, res) => {
    console.log('Request body:', req.body);
    const { name, description } = req.body;
    try {
        const newCategory = await Category.create({ name, description });
        res.status(201).json({
            status: 'success',
            data: {
                category: newCategory,
            },
            message: 'Category created successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
            data: []
        });
    }
}

exports.listCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            status: 'success',
            data: {
                categories,
            },
            message: 'Categories retrieved successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
            data: []
        });
    }
}

exports.getCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                status: 'fail',
                message: 'Category not found',
                data: []
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                category,
            },
            message: 'Category retrieved successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
            data: []
        });
    }
}