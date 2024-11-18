import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import database from "./database/index.js";
import registerRoutes from "./routes/routes.js";
const app = express();

const assertDatabaseConnection = async (): Promise<void> => {
  try {
    await database.authenticate();
    await database.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

(async () => {
  // Ensure the database connection is established before starting the server
  await assertDatabaseConnection();

  app.use(
    express.json(),
    /** Express middleware */
    cors({
      origin: "*",
    }),
    helmet() // security-related HTTP headers
  );

  /** Disable the 'X-Powered-By' header to obscure server technology details for security */
  app.disable("x-powered-by");

  // Register routes
  registerRoutes(app);

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Starting ExpressJS server on Port ${PORT}`)
  );
})();

export default app;
