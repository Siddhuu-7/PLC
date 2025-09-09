import mongoose from "mongoose";
const resourceSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    type:{
        type:String
    },
    url:{
        type:String
    },
    file:{
        type:String,
        default:null
    },
    category:{
        type:String
    },
    tags:{
        type:Array
    },
    isPublic:{
        type:Boolean
    }
});
const resourceModel=mongoose.model("resource",resourceSchema);
export default resourceModel