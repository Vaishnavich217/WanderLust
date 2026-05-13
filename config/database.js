const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

/**
 * Connects to MongoDB using MONGODB_URI from the project root `.env` file.
 * @returns {Promise<typeof mongoose>}
 */
async function connectDB() {
    const uri = process.env.MONGODB_URI;
    if (!uri || String(uri).trim() === "") {
        throw new Error(
            "MONGODB_URI is missing. Copy `.env.example` to `.env` and set your Atlas connection string."
        );
    }
    await mongoose.connect(uri);
    return mongoose;
}

module.exports = connectDB;
