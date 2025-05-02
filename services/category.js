const { default: slugify } = require('slugify');
const asyncHandler = require('express-async-handler');
const Category = require('../models/category');

exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const category = await Category.create({ name, slug: slugify(name, { lower: true }), description: req.body.description, image: req.body.image })

    res.status(201).json({
        status: 'success',
        data: {
            category,
        },
        message: 'Category created successfully',
    });
});

exports.listCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        status: 'success',
        data: {
            categories,
        },
        message: 'Categories retrieved successfully',
    });
})

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