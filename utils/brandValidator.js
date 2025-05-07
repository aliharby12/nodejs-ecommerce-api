const { check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');

exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand ID format'),
    validatorMiddleware
];

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand name is required')
        .isLength({ min: 3 })
        .withMessage('Brand name must be at least 3 characters long'),
    check('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
    validatorMiddleware
];

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand ID format'),
    check('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Brand name must be at least 3 characters long'),
    check('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
    validatorMiddleware
];

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand ID format'),
    validatorMiddleware
];

exports.listBrandsValidator = [
    check('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    check('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be a positive integer between 1 and 100'),
    validatorMiddleware
];