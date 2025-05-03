const router = require('express').Router();
const { createCategory, listCategories, getCategory, updateCategory } = require('../services/category');

router.post('/', createCategory).get('/', listCategories).get('/:id', getCategory).patch('/:id', updateCategory);

module.exports = router;