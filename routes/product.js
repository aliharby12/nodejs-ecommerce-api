const router = require('express').Router();
const {
    createProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator,
    getAllProductValidator,
} = require('../utils/productValidator');

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../services/product');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of items per page
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter products by title
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort field(s), e.g. title,-price
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields, e.g. title,price
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The product title
 *               description:
 *                 type: string
 *                 description: The product description
 *               price:
 *                 type: number
 *                 description: The product price
 *               categoryId:
 *                 type: string
 *                 description: The category ID
 *               brandId:
 *                 type: string
 *                 description: The brand ID
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid request body
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The product title
 *               description:
 *                 type: string
 *                 description: The product description
 *               price:
 *                 type: number
 *                 description: The product price
 *               categoryId:
 *                 type: string
 *                 description: The category ID
 *               brandId:
 *                 type: string
 *                 description: The brand ID
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

router.route('/')
    .post(
        createProductValidator, createProduct
    )
    .get(getAllProductValidator, getAllProducts);

router.route('/:id')
    .get(
        getProductValidator, getProductById
    )
    .patch(
        updateProductValidator, updateProduct
    )
    .delete(
        deleteProductValidator, deleteProduct
    );

module.exports = router;