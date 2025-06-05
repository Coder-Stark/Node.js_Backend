const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); 

const mongo_uri = process.env.MONGO_URI;

const connectDB = async () => {
    if (!mongo_uri) {
        console.error("❌ MONGO_URI not found in .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected Successfully!");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;