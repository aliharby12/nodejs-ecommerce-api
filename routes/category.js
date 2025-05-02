const router = require('express').Router();
const { createCategory, listCategories, getCategory } = require('../services/category');

router.post('/', createCategory).get('/', listCategories).get('/:id', getCategory);

module.exports = router;