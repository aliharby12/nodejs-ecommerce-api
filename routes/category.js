const router = require('express').Router();

const {
    createCategory,
    listCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    listSubcategories,
    listCategoryProducts
} = require('../services/category');
const {
    createCategoryValidator,
    listCategoriesValidator,
    updateCategoryValidator,
    getCategoryValidator,
    deleteCategoryValidator
} = require('../utils/categoryValidator');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
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
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter categories by name
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort field(s), e.g. name,-createdAt
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields, e.g. name,description
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The category ID
 *                       name:
 *                         type: string
 *                         description: The category name
 *                       description:
 *                         type: string
 *                         description: The category description
 *                       slug:
 *                         type: string
 *                         description: The category slug
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalResults:
 *                       type: integer
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The category name
 *               description:
 *                 type: string
 *                 description: The category description
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid request body
 */
router.route('/')
    .post(
        createCategoryValidator,
        createCategory,
    )
    .get(
        listCategoriesValidator,
        listCategories
    );

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The category name
 *               description:
 *                 type: string
 *                 description: The category description
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.route('/:id')
    .get(
        getCategoryValidator,
        getCategory
    )
    .patch(
        updateCategoryValidator,
        updateCategory
    )
    .delete(
        deleteCategoryValidator,
        deleteCategory
    );

/**
 * @swagger
 * /categories/{parentId}/subcategories:
 *   get:
 *     summary: Get all subcategories of a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Parent category ID
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
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter subcategories by name
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort field(s), e.g. name,-createdAt
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields, e.g. name,description
 *     responses:
 *       200:
 *         description: List of subcategories
 *       404:
 *         description: Parent category not found
 */
router.get('/:parentId/subcategories', listSubcategories);

/**
 * @swagger
 * /categories/{categoryId}/products:
 *   get:
 *     summary: Get all products of a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
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
 *         description: Sort field(s), e.g. name,-price
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields, e.g. name,price
 *     responses:
 *       200:
 *         description: List of products in the category
 *       404:
 *         description: Category not found
 */
router.get('/:categoryId/products', listCategoryProducts);

module.exports = router;