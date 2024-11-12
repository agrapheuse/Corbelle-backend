import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import routes from "./routes/routes.js";
const app = express();

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
