import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../index.js";

interface ImageAttributes {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, "id"> {}

class Image
  extends Model<ImageAttributes, ImageCreationAttributes>
  implements ImageAttributes
{
  public id!: string;
  public title!: string;
  public description!: string;
  public imageUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "Image",
    timestamps: true,
  }
);

export { Image };
export type { ImageAttributes, ImageCreationAttributes };
