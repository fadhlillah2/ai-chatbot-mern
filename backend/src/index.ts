import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { config } from "dotenv";

// Load environment variables
config();

// Get PORT from environment or use default
const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    // Connect to database first
    await connectToDatabase();
    
    // Start listening on specified port
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
      console.log(`API available at http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(error);
  process.exit(1);
});

// Start the server
startServer();
