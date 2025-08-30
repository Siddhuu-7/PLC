import express from "express";
import TestModel from "../Models/test.model.js";
import FileTotextMiddleware from "../Middlewares/FileTotext.middleware.js";
import multer from 'multer'
import testMiddleware from "../Middlewares/test.middleware.js";
import alltestsMiddleware from "../Middlewares/alltests.middleware.js";
const Router = express.Router();
const upload=multer({storage:multer.memoryStorage()})
Router.post("/",upload.single("file"), FileTotextMiddleware, async (req, res) => {
  try {
    const testId=req.body.testId
    const testName=req.body.testName
    const  questionsArray  = req.body.fileText;

    if (!questionsArray) {
      return res.status(400).json({ msg: "No data found in file" });
    }
    const testDoc = new TestModel({
      testId:testId,
      testName:testName,
       test: questionsArray });
    await testDoc.save();

    res.status(201).json({ msg: "Questions saved successfully", testData: testDoc });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
});
Router.get('/test/:testId',testMiddleware)
Router.get("/alltests",alltestsMiddleware)
export default Router;
