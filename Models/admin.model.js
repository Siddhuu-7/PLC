import { DataTypes } from "sequelize";
import  sequelize  from "../SQLdb.config.js";
import mongoose from "mongoose";
const Admin=sequelize.define("admins",{
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    registerNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    branch:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mobileNumber:{
        type:DataTypes.BIGINT
    },
    year:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userImg:{
        type:DataTypes.STRING,
        allowNull:true,
    }
   
})

const userScehme= new mongoose.Schema({
    userId:{
        type:String,
 required: true, 
        unique: true,
    },
    userImg:{
        type:Buffer,
        default:null
    }
})
const NOSQLUSER= mongoose.model("Admin",userScehme)
export  {Admin,NOSQLUSER}