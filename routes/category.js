const router = require('express').Router();
const { createCategory, listCategories, getCategory, updateCategory, deleteCategory } = require('../services/category');
const {
    createCategoryValidator,
    listCategoriesValidator,
    updateCategoryValidator,
    getCategoryValidator,
    deleteCategoryValidator
} = require('../utils/categoryValidator');

router.route('/')
    .post(
        createCategoryValidator,
        createCategory
    )
    .get(
        listCategoriesValidator,
        listCategories
    );

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

module.exports = router;