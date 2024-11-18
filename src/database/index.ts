import { Sequelize } from "sequelize";
import connection from "./config/db.js";

const { database, user, password, host, port } = connection;

const sequelizeConnection = new Sequelize(database, user, password, {
  host,
  port: port,
  dialect: "mysql",
});

export default sequelizeConnection;
