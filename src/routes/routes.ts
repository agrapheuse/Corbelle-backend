import { Application } from "express";
import ImageController from "../controller/ImageController.js";

export default function registerRoutes(app: Application): void {
  // Initialize the ImageController
  const imageController = new ImageController();
  const imageRoutes = imageController.routes();

  app.get("/", (_req, res) => {
    res.send("Welcome to the Image API!");
  });

  // Register routes dynamically
  imageRoutes.forEach((route) => {
    app[route.method](imageController.basePath + route.path, route.handler);
  });
}
