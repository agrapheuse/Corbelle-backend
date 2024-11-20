import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController.js";
import { ImageService } from "@/services/imageService.js";
import { ImageAttributes } from "@/database/model/Image.js";
import { RouteDefinition } from "../routes/RouteDefinition.js";
import { ResponseStatus } from "@/enums/api.js";

/**
 * Enquiry controller
 */
export default class ImageController extends BaseController {
  private image: ImageService;
  public basePath: string = "/images";

  constructor() {
    super();
    this.image = new ImageService();
  }

  /**
   * The routes method returns an array of route definitions for CRUD operations
   * (GET, POST, PUT, DELETE) on enquiries,
   * with corresponding handlers bound to the controller instance.
   */
  public routes(): RouteDefinition[] {
    return [
      { path: "/", method: "get", handler: this.getImages.bind(this) },
      {
        path: "/:id",
        method: "get",
        handler: this.getImage.bind(this),
      },
      // {
      //   path: "/",
      //   method: "post",
      //   handler: this.createImage.bind(this),
      // },
      {
        path: "/:id",
        method: "put",
        handler: this.updateImage.bind(this),
      },
      { path: "/:id", method: "delete", handler: this.delete.bind(this) },
    ];
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async getImages(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const images: ImageAttributes[] = await this.image.getAll();
      res.locals.data = images;
      // call base class method
      this.send(res, ResponseStatus.OK);
    } catch (err) {
      next(err);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async getImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const image: ImageAttributes = await this.image.getById(id);
      res.locals.data = image;
      // call base class method
      this.send(res, ResponseStatus.OK);
    } catch (err) {
      next(err);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async updateImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const { body } = req;
      const image: ImageAttributes = await this.image.update(id, body);
      res.locals.data = {
        image,
      };
      // call base class method
      this.send(res, ResponseStatus.OK);
    } catch (err) {
      next(err);
    }
  }

  // /**
  //  *
  //  * @param req
  //  * @param res
  //  * @param next
  //  */
  // public async createImage(img: File): Promise<void> {
  //   try {
  //     const { title, description, imageUrl } = req.body;
  //     if (!title || !description || !imageUrl) {
  //       throw new Error(ReasonPhrases.BAD_REQUEST);
  //     }
  //     const image: ImageAttributes = await this.image.create({
  //       title,
  //       description,
  //       imageUrl,
  //     });
  //     res.locals.data = {
  //       image,
  //     };
  //     // call base class method
  //     super.send(res, ResponseStatus.CREATED);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const status: boolean = await this.image.delete(id);
      res.locals.data = {
        status,
      };
      // call base class method
      this.send(res, ResponseStatus.OK);
    } catch (err) {
      next(err);
    }
  }
}
