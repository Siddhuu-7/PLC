import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()
const sequelize = new Sequelize('PLC', 'root', '23B91A12H3', {
  host: 'localhost',
  dialect:  'mysql' 
});

export default sequelize;
