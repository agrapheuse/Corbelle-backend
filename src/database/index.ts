import { Dialect, Sequelize } from "sequelize";
import connection from "./config/db.js";

const { database, user, password, host, dbLogging } = connection;

const sequelizeConnection = new Sequelize(database, user, password, {
  host,
  logging: dbLogging,
  dialect: "mysql" as Dialect,
});

export default sequelizeConnection;
