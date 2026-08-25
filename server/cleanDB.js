require("dotenv").config();
const mongoose = require("mongoose");

const cleanDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dermcare";
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(mongoURI);
    console.log(" Connected to MongoDB!");

    // Get all collections in the database
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
      console.log(` Cleared: ${collection.collectionName}`);
    }

    console.log("\n All Doctor, Patient, Appointment, Bill, and User data cleared successfully!");
    process.exit(0);
  } catch (error) {
    console.error(" Error wiping database:", error);
    process.exit(1);
  }
};

cleanDatabase();