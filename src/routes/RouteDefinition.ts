import { Request, Response, NextFunction } from "express";

export interface RouteDefinition {
  path: string; // The route path, e.g., "/images/:id".
  method: "get" | "post" | "put" | "delete" | "patch"; // HTTP methods.
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>; // The controller's handler function.
}
