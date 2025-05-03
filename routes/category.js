const router = require('express').Router();
const { createCategory, listCategories, getCategory, updateCategory, deleteCategory } = require('../services/category');

router.post('/', createCategory)
    .get('/', listCategories)
    .get('/:id', getCategory)
    .patch('/:id', updateCategory)
    .delete('/:id', deleteCategory);

module.exports = router;