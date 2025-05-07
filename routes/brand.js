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
// Routes
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