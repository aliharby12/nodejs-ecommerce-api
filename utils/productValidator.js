const { check } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator');

exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid product ID format'),
    validatorMiddleware
];

exports.createProductValidator = [
    check('title')
        .notEmpty()
        .withMessage('Product title is required')
        .isLength({ min: 3 })
        .withMessage('Product title must be at least 3 characters long')
        .matches(/^[a-zA-Z0-9\s._,'-]+$/)
        .withMessage('Product title must contain only letters, numbers, spaces, or -_,.'),
    check('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
    check('price')
        .notEmpty()
        .withMessage('Price is required')
        .isNumeric()
        .withMessage('Price must be a number'),
    validatorMiddleware
];

exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid product ID format'),
    check('title')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Product title must be at least 3 characters long'),
    check('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters'),
    check('price')
        .optional()
        .isNumeric()
        .withMessage('Price must be a number'),
    validatorMiddleware
];

exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid product ID format'),
    validatorMiddleware
];

exports.getAllProductValidator = [
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