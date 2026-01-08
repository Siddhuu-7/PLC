import express from "express";
const Router = express.Router();
import {NOSQLUSER} from '../Models/users.model.js';
import multer from "multer";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import jwtToken from '../Middlewares/jwtmiddleware.js'
import {authController,userDetails,loginController,picsController,getAttendence,clearCookies} from "../controllers/auth.controller.js";
import updateController from "../controllers/update.controller.js";
import {postAttendence,updateClassDone,addToAtttendence,StudentListController} from "../controllers/attendence.controller.js";
import {partialUser} from "../Models/partialUser.model.js"
const upload=multer({storage:multer.memoryStorage()})

Router.post("/signUp",upload.single('userImg'), addToAtttendence,async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ msg: "No data found" });
    }
    // if (!req.file) {
    //   return res.status(400).json({ msg: "No image file uploaded" });
    // }
    const hasedPassword=await bcrypt.hash(body.password,10)
    body.password=hasedPassword;
    const NoSQL=new NOSQLUSER({userId:body.registerNumber,
      userImg:req.file?req.file.buffer:null})
    await NoSQL.save()
    console.log("image saved")
    const imgId= await NOSQLUSER.findOne({userId:body.registerNumber},{_id:1,userId:0,userImg:0})
    body.userImg=imgId.userId
    const newUser = await partialUser.create(body);
     const token = jwt.sign(
      { userId: body.registerNumber },
      process.env.SECREATE_KEY,
      { expiresIn: "21d" }
    );
 res.cookie("token", token, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 21*24*60*60*1000, 
  });
  res.cookie("registerNumber",body.registerNumber,{
    httpOnly:false
  })
    res.status(201).json({
      msg: "Data received successfully",
      user: newUser, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});
Router.get("/autologin",jwtToken,authController)
Router.post('/login',loginController)
Router.put('/update',upload.single("file"),updateController)
Router.get("/details",userDetails)
Router.put("/attendence",postAttendence)
Router.get("/getattendence",getAttendence)
Router.get("/pics",picsController)
Router.get("/updateclass",updateClassDone)
Router.get("/clearcookie",clearCookies)
Router.get("/studentlist",StudentListController)
export default Router;
