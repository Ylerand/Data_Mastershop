require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

async function checkConnection() {
    console.log('--- Verifying MasterShop MongoDB Integration ---');
    console.log('URI detected:', process.env.MONGODB_URI ? 'Yes (Retracted for privacy)' : 'No URI found in .env');

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Success: Connected to MongoDB Atlas');

        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();

        console.log(`📊 Current Statistics:`);
        console.log(`   - Products in DB: ${productCount}`);
        console.log(`   - Users in DB: ${userCount}`);

        if (productCount > 0) {
            console.log('✅ Project is successfully using MongoDB for products.');
        } else {
            console.log('⚠️  Connected, but database is empty. You may need to run node seed.js');
        }

        await mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error: Could not connect to MongoDB Atlas');
        console.error('Details:', error.message);
        console.log('\n--- Recommendation ---');
        console.log('1. Check if your IP is whitelisted in MongoDB Atlas (Network Access).');
        console.log('2. Ensure your internet connection allows SRV (DNS) lookups.');
    }
}

checkConnection();
