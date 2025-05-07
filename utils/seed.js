require('dotenv').config();
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const dbConnection = require('../config/database');

// Models
const Brand = require('../models/brand');
const Category = require('../models/category');
const Product = require('../models/product');

// Path to dummyData folder (now at root level)
const dummyDataPath = path.join(__dirname, '../dummyData'); // Goes up one level, then into dummyData

// Read JSON files
const categories = JSON.parse(fs.readFileSync(path.join(dummyDataPath, 'categories.json'), 'utf-8'));
const brands = JSON.parse(fs.readFileSync(path.join(dummyDataPath, 'brands.json'), 'utf-8'));
const products = JSON.parse(fs.readFileSync(path.join(dummyDataPath, 'products.json'), 'utf-8'));

// Database connection
dbConnection();

// Import data into DB
const importData = async () => {
  try {

    // Insert categories first (since products reference them)
    await Category.create(categories);
    console.log('Categories successfully imported!');

    // Then brands
    await Brand.create(brands);
    console.log('Brands successfully imported!');

    // Finally products
    await Product.create(products);
    console.log('Products successfully imported!');

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error with data import', err);
    process.exit(1);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {

    await Brand.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.error('Error with data deletion', err);
    process.exit(1);
  }
};

// Determine which function to run based on command line argument
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please specify an action: --import or --delete');
  process.exit(1);
}