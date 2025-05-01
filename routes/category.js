const router = require('express').Router();
const { createCategory } = require('../services/category');

router.post('/', createCategory);

module.exports = router;