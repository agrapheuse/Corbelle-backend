import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Image extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public url!: string;
  public createdAt!: Date;
}

Image.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images", // Table name in the database
    timestamps: false, // Disable automatic `createdAt` and `updatedAt` timestamps if not needed
  }
);

export default Image;
