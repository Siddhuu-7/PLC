import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()
import fs from "fs";


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // e.g. 25060
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        ca: process.env.NODE_ENV==="production"?fs.readFileSync("/etc/secrets/ca.pem"):fs.readFileSync("./ca.pem"),
        rejectUnauthorized: true
      },
      connectTimeout: 20000
    }
  }
);

export default sequelize;

