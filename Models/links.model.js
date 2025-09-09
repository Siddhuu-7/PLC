import mongoose from "mongoose";
const linkSchema=new mongoose.Schema({
    linkName:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})
const linkModel=mongoose.model("links",linkSchema)
export default linkModel