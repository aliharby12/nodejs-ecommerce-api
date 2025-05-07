const { default: slugify } = require('slugify');
const asyncHandler = require('express-async-handler');
const Brand = require('../models/brand');
const paginate = require('../utils/paginate');
const ApiErrorHandler = require('../utils/errorHandler');
const brandFilter = require('../filtersAndSort/brand');
const sortBrand = require('../filtersAndSort/generalSort');
const brandFields = require('../filtersAndSort/generalFieldsQuery');

// Create a new brand
exports.createBrand = asyncHandler(async (req, res, next) => {
    const { name, image } = req.body;

    const brand = await Brand.create({
        name,
        slug: slugify(name, { lower: true }),
        image,
        runValidators: true,
    });

    res.status(201).json({
        status: 'success',
        data: {
            brand,
        },
        message: 'Brand created successfully',
    });
});

// Get all brands
exports.listBrands = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;

    const filter = brandFilter(req.query);
    const sort = sortBrand(req.query);
    const fields = brandFields(req.query);

    const brands = await Brand.find(filter).sort(sort).select(fields);

    const paginationResult = await paginate(brands, page, limit);

    res.status(200).json({
        status: 'success',
        data: {
            brands: paginationResult.data,
        },
        ...paginationResult,
        message: 'Brands retrieved successfully',
    });
});

// Get a single brand by ID
exports.getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ApiErrorHandler('Brand ID is required', 400));
    }
    const brand = await Brand.findById(id);
    if (!brand) {
        return next(new ApiErrorHandler('Brand not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            brand,
        },
        message: 'Brand retrieved successfully',
    });
});

// Update a brand
exports.updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ApiErrorHandler('Brand ID is required', 400));
    }

    const updates = req.body;
    if (updates.name) {
        updates.slug = slugify(updates.name, { lower: true });
    }

    const brand = await Brand.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });

    if (!brand) {
        return next(new ApiErrorHandler('Brand not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            brand,
        },
        message: 'Brand updated successfully',
    });
});

// Delete a brand
exports.deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ApiErrorHandler('Brand ID is required', 400));
    }

    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
        return next(new ApiErrorHandler('Brand not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
        message: 'Brand deleted successfully',
    });
});