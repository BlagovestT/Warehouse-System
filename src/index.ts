import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import sequelize from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

//Middleware setup
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Database connection and synchronization
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
