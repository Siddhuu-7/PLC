import { DataTypes } from "sequelize";
import  sequelize  from "../SQLdb.config.js";
import mongoose from "mongoose";
const attendence=sequelize.define("attendences",{

    userName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    registerNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    year:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    classattend:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    classHeld:{
        type:DataTypes.BIGINT,
        // default:90,
        allowNull:true
    },
    
    

})

const classDoneSchema = new mongoose.Schema({
    className: {
        type: String,
        default: "PLC"   
    },
    postedAt: {
    type: Date,
    default: Date.now   
  },
    classDone: {
        type: Number,
        default: 0      
    }
});



const classDoneModel=mongoose.model("classDone",classDoneSchema)
export { attendence,classDoneModel};