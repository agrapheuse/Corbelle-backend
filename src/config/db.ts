import { Sequelize } from "sequelize";

const sequelize = new Sequelize("images_db", "user", "password", {
  host: "mysql_images_db",
  port: 3307,
  dialect: "mysql",
});

export default sequelize;
