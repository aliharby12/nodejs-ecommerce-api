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

router.route('/')
    .post(
        createCategoryValidator,
        createCategory,
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

// list all subcategories of a category
router.get('/:parentId/subcategories', listSubcategories);

// list all products of a category
router.get('/:categoryId/products', listCategoryProducts);

module.exports = router;