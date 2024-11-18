import {
  Image,
  ImageAttributes,
  ImageCreationAttributes,
} from "@/database/model/Image.js";

export class EnquiryService {
  async getAll(): Promise<ImageAttributes[]> {
    try {
      const images = await Image.findAll();
      return images;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getById(id: string | number): Promise<ImageAttributes> {
    try {
      const image = await Image.findByPk(id);
      if (!image) {
        throw new Error("Enquiry not found");
      }
      return image;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(
    id: string | number,
    payload: Partial<ImageCreationAttributes>
  ): Promise<ImageAttributes> {
    try {
      const image = await Image.findByPk(id);
      if (!image) {
        throw new Error("Enquiry not found");
      }
      const updatedImage = await image.update(payload);
      return updatedImage;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(payload: ImageCreationAttributes): Promise<ImageAttributes> {
    try {
      const image = await Image.create(payload);
      return image;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: string | number): Promise<boolean> {
    try {
      const deletedImageCount = await Image.destroy({
        where: { id },
      });

      return !!deletedImageCount;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
