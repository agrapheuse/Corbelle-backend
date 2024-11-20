import { Application } from "express";
import ImageController from "../controller/ImageController.js";
import { Request, Response } from "express";
import multer from "multer";

export default function registerRoutes(app: Application): void {
  // Initialize the ImageController
  const imageController = new ImageController();
  const imageRoutes = imageController.routes();

  app.get("/", (_req, res) => {
    res.send("Welcome to the Image API!");
  });

  const upload = multer({ storage: multer.memoryStorage() });

  app.post("/", upload.single("file"), (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    console.log(req.file);

    imageController.createImage(req.file, req.body.title, req.body.description);
    res.json({ message: "File uploaded successfully to backend" });
  });

  // Register routes dynamically
  imageRoutes.forEach((route) => {
    app[route.method](imageController.basePath + route.path, route.handler);
  });
}
