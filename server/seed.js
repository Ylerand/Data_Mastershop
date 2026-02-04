require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const products = require('./data/products.json');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Transform products to match schema if necessary
        const seededProducts = await Product.insertMany(products);
        console.log(`Seeded ${seededProducts.length} products`);

        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
