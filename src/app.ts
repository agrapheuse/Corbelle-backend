import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import routes from "./routes/routes.js";
import database from "./database/index.js";
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

routes(app);

app.listen(process.env.PORT, () =>
  console.log("Starting ExpressJS server on Port " + process.env.PORT)
);

export default app;
