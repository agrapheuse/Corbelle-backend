import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController.js";
import { ImageService } from "@/services/imageService.js";
import { ImageAttributes } from "@/database/model/Image.js";
import { RouteDefinition } from "../routes/RouteDefinition.js";
import { ResponseStatus } from "@/enums/api.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

/**
 * Enquiry controller
 */
export default class ImageController extends BaseController {
  private image: ImageService;
  public basePath: string = "/images";

  private s3Client = new S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY || "",
      secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
    },
  });

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

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async createImage(
    img: Express.Multer.File,
    title: string,
    description: string
  ): Promise<void> {
    try {
      const image: ImageAttributes = await this.image.create({
        title,
        description,
        imageUrl: "placeholder",
      });
      try {
        const fileStream = Readable.from(img.buffer);
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: title,
          Body: fileStream,
        };

        await this.s3Client.send(new PutObjectCommand(params));
        console.log("File uploaded successfully to bucket");
        const imageUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        await this.image.update(image.id, { imageUrl });
      } catch (err) {
        await this.image.delete(image.id);
      }
    } catch (err) {}
  }

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
