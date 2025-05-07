const { default: slugify } = require('slugify');
const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const paginate = require('../utils/paginate');
const ApiErrorHandler = require('../utils/errorHandler');

// Create a new category
exports.createCategory = asyncHandler(async (req, res, next) => {
    const { name, parentCategory, description, image } = req.body;

    let parentCategoryDoc = null;
    if (parentCategory) {
        parentCategoryDoc = await Category.findById(parentCategory);
        if (!parentCategoryDoc) {
            return next(new ApiErrorHandler('Parent category not found', 404));
        }
    }

    const category = await Category.create({
        name,
        slug: slugify(name, { lower: true }),
        description,
        image,
        parentCategory: parentCategoryDoc ? parentCategoryDoc._id : null,
        runValidators: true,
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
exports.listCategories = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const paginationResult = await paginate(Category, page, limit, 'parentCategory');

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
exports.getCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ApiErrorHandler('Category ID is required', 400));
    }
    const category = await Category.findById(id).populate('parentCategory');
    if (!category) {
        return next(new ApiErrorHandler('Category not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            category,
        },
        message: 'Category retrieved successfully',
    });
});

// Update a category
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ApiErrorHandler('Category ID is required', 400));
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
        return next(new ApiErrorHandler('Category not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            category,
        },
        message: 'Category updated successfully',
    });
});

// Delete a category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ApiErrorHandler('Category ID is required', 400));
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        return next(new ApiErrorHandler('Category not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
        message: 'Category deleted successfully',
    });
});
