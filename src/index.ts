import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import DatabaseManager from "./config/database.manager.js";
import routes from "./routes/routes.js";
// import bodyParser from "body-parser";
import { ErrorHandlerMiddleware } from "./middleware/error-handler.middleware.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware setup
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
// app.use(bodyParser.json()); //Todo: mahni go tozi parser express po default go pravi

// Route handling
app.use("/api", routes);

app.use(ErrorHandlerMiddleware);

// Initialize database and start server
const startServer = async (): Promise<void> => {
  const dbManager = DatabaseManager.getInstance();

  try {
    // Initialize database (models, associations, connection)
    await dbManager.initialize();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the application
startServer();
