import { ResponseStatus } from "../enums/api.js";
import type { Request, Response } from "express";

const HealthCheckController = (_req: Request, res: Response) => {
  res.status(ResponseStatus.OK).json({ message: "OK" });
};

export default HealthCheckController;
