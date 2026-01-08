import express from "express";
import TestModel from "../Models/test.model.js";
import multer from 'multer'
import {testMiddleware,codeRunnerMiddleWare,codeSubmitMiddleWare} from "../Middlewares/test.middleware.js";
import {alltestsMiddleware,resultsController,ScoreController} from "../Middlewares/alltests.middleware.js";
import testDataModel from "../Models/testData.model.js";
const Router = express.Router();
const upload=multer({storage:multer.memoryStorage()})
Router.post("/",  async (req, res) => {
  try {
     
    const testDoc = new TestModel(req.body);
    await testDoc.save();
    if(!req.body.ispublic){
      const {testStartTime}=req.query
      console.log("quer",req.query)
        const data=new testDataModel({
          testName:req.body.testName,
          testId:req.body.testId,
          testStartTime:testStartTime
        })
        data.save()
        res.status(201).json({ url:`${process.env.VITE_backend_Url}/api/questions/private/livetest?testId=${data._id}`});
        return;
    }
    res.status(201).json({ msg: "Questions saved successfully", testData: testDoc });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
});
Router.get('/test',testMiddleware)
Router.get("/alltests",alltestsMiddleware)
Router.post("/results",resultsController)
Router.post("/run",codeRunnerMiddleWare)
Router.post("/submit",codeSubmitMiddleWare)
Router.get("/getscore",ScoreController)
Router.get("/private/livetest",async(req,res)=>{
  try {
    const {testId}=req.query;
    const UrlData=await testDataModel.findOne({_id:testId});
    res.redirect(`${process.env.VITE_backend_Url}/students/livetest?testId=${UrlData.testId}&testDetails=${testId}`)
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
})
Router.get("/testDetails",async(req,res)=>{
  try {
    const {testDetails}=req.query;
      const data=await testDataModel.findOne({_id:testDetails})
      res.status(200).json({data})
  } catch (error) {
        res.status(500).json({msg:error.message})

  }
})
export default Router;
