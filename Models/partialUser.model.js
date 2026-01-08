import { DataTypes } from "sequelize";
import  sequelize  from "../SQLdb.config.js";
import mongoose from "mongoose";
const partialUser=sequelize.define("partialUser",{
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
},

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


export  {partialUser}