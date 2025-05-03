const { default: slugify } = require('slugify');
const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const paginate = require('../utils/paginate')

// Create a new category
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const category = await Category.create({
        name, slug: slugify(name, { lower: true }), description: req.body.description, image: req.body.image, runValidators: true
    });

    res.status(201).json({
        status: 'success',
        data: {
            category,
        },
        message: 'Category created successfully',
    });
});

// Get all categories
exports.listCategories = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const paginationResult = await paginate(Category, page, limit);

    res.status(200).json({
        status: 'success',
        data: {
            categories: paginationResult.data,
        },
        ...paginationResult,
        message: 'Categories retrieved successfully',
    });
});

// Get a single category by ID
exports.getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            status: 'fail',
            message: 'Category ID is required',
            data: []
        });
    }
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
})

// Update a category
exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            status: 'fail',
            message: 'Category ID is required',
            data: []
        });
    }

    const updates = req.body;
    if (updates.name) {
        updates.slug = slugify(updates.name, { lower: true });
    }

    const category = await Category.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });

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
        message: 'Category updated successfully',
    });
})

// Delete a category
exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            status: 'fail',
            message: 'Category ID is required',
            data: []
        });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        return res.status(404).json({
            status: 'fail',
            message: 'Category not found',
            data: []
        });
    }

    res.status(204).json({
        status: 'success',
        data: null,
        message: 'Category deleted successfully',
    });
})