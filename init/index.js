const mongoose = require("mongoose");
const connectDB = require("../config/database");
const initData = require("./data.js");
const Listing = require("../models/listing.models.js");

const initDB = async () => {
    console.log("Clearing existing listings...");
    await Listing.deleteMany({});
    console.log("Inserting new listings...");
    await Listing.insertMany(initData.data);
    console.log("Data was initialized successfully");
};

async function run() {
    try {
        await connectDB();
        console.log("Connected to the database");
        await initDB();
        await mongoose.connection.close();
        console.log("Database connection closed.");
        process.exit(0);
    } catch (err) {
        console.error("Init failed:", err.message);
        await mongoose.connection.close().catch(() => {});
        process.exit(1);
    }
}

run();
