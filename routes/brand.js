const router = require('express').Router();
const {
    createBrand,
    listBrands,
    getBrand,
    updateBrand,
    deleteBrand
} = require('../services/brand');
const {
    createBrandValidator,
    listBrandsValidator,
    updateBrandValidator,
    getBrandValidator,
    deleteBrandValidator
} = require('../utils/brandValidator');

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: API for managing brands
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
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
 *         description: Filter brands by name
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
 *         description: List of brands
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
 *                         description: The brand ID
 *                       name:
 *                         type: string
 *                         description: The brand name
 *                       description:
 *                         type: string
 *                         description: The brand description
 *                       slug:
 *                         type: string
 *                         description: The brand slug
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The brand name
 *               description:
 *                 type: string
 *                 description: The brand description
 *     responses:
 *       201:
 *         description: Brand created successfully
 */

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: Brand details
 *       404:
 *         description: Brand not found
 *   patch:
 *     summary: Update a brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The brand name
 *               description:
 *                 type: string
 *                 description: The brand description
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       404:
 *         description: Brand not found
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 */

router.route('/')
    .post(
        createBrandValidator,
        createBrand
    )
    .get(
        listBrandsValidator,
        listBrands
    );

router.route('/:id')
    .get(
        getBrandValidator,
        getBrand
    )
    .patch(
        updateBrandValidator,
        updateBrand
    )
    .delete(
        deleteBrandValidator,
        deleteBrand
    );

module.exports = router;