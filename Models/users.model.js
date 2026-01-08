import { DataTypes } from "sequelize";
import  sequelize  from "../SQLdb.config.js";
import mongoose from "mongoose";
const User=sequelize.define("User",{
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
    mobileNumber: {
  type: DataTypes.STRING,   
  allowNull: true
}
,
    gmail:{type:DataTypes.STRING},
    year:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    userImg:{
        type:DataTypes.STRING,
        allowNull:true,
    },
   courses: {
    type: DataTypes.JSON, 
    allowNull: true
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
const NOSQLUSER= mongoose.model("User",userScehme)
export  {User,NOSQLUSER}