const router = require('express').Router();
const { createCategory, listCategories, getCategory } = require('../services/category');

router.post('/', createCategory);
router.get('/', listCategories);
router.get('/:id', getCategory);

module.exports = router;