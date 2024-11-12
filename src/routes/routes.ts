import HealthCheckController from "../controller/health-check.js";
import { Application } from "express";

const routes = (app: Application) => {
  app.get("/", HealthCheckController);
};

export default routes;
