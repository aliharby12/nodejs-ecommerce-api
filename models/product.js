const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
        minlength: [3, 'Product title must be at least 3 characters long'],
        maxlength: [100, 'Product title must be at most 100 characters long'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: 0
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product category is required'],
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;