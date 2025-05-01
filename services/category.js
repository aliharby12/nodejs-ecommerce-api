const Category = require('../models/category');

exports.createCategory = async (req, res) => {
    console.log('Request body:', req.body);
    const { name, description } = req.body;
    try {
        const newCategory = await Category.create({ name, description });
        res.status(201).json({
            status: 'success',
            data: {
                category: newCategory,
            },
            message: 'Category created successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
            data: []
        });
    }
}