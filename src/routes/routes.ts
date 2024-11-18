import { Application } from "express";
import ImageController from "../controller/ImageController.js";

export default function registerRoutes(app: Application): void {
  // Initialize the ImageController
  const imageController = new ImageController();
  const imageRoutes = imageController.routes();

  // Register routes dynamically
  imageRoutes.forEach((route) => {
    app[route.method](imageController.basePath + route.path, route.handler);
  });
}
