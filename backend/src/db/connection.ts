import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    
    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }
    
    console.log("Connecting to MongoDB...");
    await connect(mongoUrl);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Could not connect to MongoDB. Please check your connection string and network.");
  }
}

async function disconnectFromDatabase() {
  try {
    console.log("Disconnecting from MongoDB...");
    await disconnect();
    console.log("Disconnected from MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB Disconnection Error:", error);
    throw new Error("Could not disconnect from MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
