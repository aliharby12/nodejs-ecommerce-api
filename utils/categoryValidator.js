const { check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware
];

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters long')
        .isAlphanumeric()
        .matches(/^[a-zA-Z0-9\s.,'_-\s]+$/)
        .withMessage('Category name must contain only letters, numbers, spaces, or -_,.'),
    check('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
    validatorMiddleware
];
exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    check('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters long')
        .isAlphanumeric()
        .withMessage('Category name must contain only letters and numbers'),
    check('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
    validatorMiddleware
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware
];

exports.listCategoriesValidator = [
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