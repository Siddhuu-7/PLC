import { Sequelize } from "sequelize";
const sequelize=new Sequelize(
    'PLC','root','23B91A12H3',{
        host:'localhost',
        dialect:'mysql'
    }
)

export  default sequelize;