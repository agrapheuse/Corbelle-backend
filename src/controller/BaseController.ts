import { ResponseStatus } from "@/enums/api.js";
import { Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

/**
 * BaseController: A generic class for shared functionality among controllers.
 */
export default class BaseController {
  /**
   * Sends a standardized JSON response.
   * @param res - Express response object.
   * @param statusCode - HTTP status code (default is 200).
   */
  public send(res: Response, statusCode: ResponseStatus): void {
    res.status(statusCode).json({
      status: getReasonPhrase(statusCode),
      data: res.locals.data || null,
    });
  }

  /**
   * Sends an error response.
   * @param res - Express response object.
   * @param message - Error message to send.
   * @param statusCode - HTTP status code (default is 500).
   */
  public sendError(
    res: Response,
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
  ): void {
    res.status(statusCode).json({
      status: getReasonPhrase(statusCode),
      error: message,
    });
  }
}
