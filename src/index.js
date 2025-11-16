import "dotenv/config";
import app from "./app.js";
import db from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  console.log("Starting server...");

  try {
    await db.raw("SELECT 1+1 AS result");
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
