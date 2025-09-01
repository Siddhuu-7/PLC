import mongoose from "mongoose";
const questionsSchema=new mongoose.Schema({
question:{
        type:String,
 required: true, 
    },
    option:[
        {type:String,
 required: true, 
    }],
    answer:{
        type:String,
 required: true, 
    }
})
const testSchema=new mongoose.Schema({
    testId:{
        type:Number,
        required:true,
        unique:true,
    },
    testName:{
        type:String,
        required:true,
    },
    testSubject:{
        type:String,
        required:true
    },
    test:[questionsSchema],
    questions:{
        type:Number,
        required:true
    }

})
const testModel=mongoose.model("test",testSchema)
export  default testModel;