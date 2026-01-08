import mongoose from "mongoose";
const testSchema=new mongoose.Schema({
    testName:{type:String},
    testId:{type:Number},
    testStartTime:{type:String}
})
export default mongoose.model("livetest",testSchema)