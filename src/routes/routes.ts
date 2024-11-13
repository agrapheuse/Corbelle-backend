import GetImagesController from "@/controller/get-images.js";
import HealthCheckController from "../controller/health-check.js";
import { Application } from "express";
import PostImagesController from "@/controller/post-images.js";

const routes = (app: Application) => {
  app.get("/", HealthCheckController);
  app.get("/images", GetImagesController);
  app.post("/images", PostImagesController);
};

export default routes;
