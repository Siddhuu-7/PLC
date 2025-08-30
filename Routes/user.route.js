import express from "express";
const Router = express.Router();
import {User,NOSQLUSER} from '../Models/users.model.js';
import multer from "multer";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import jwtToken from '../Middlewares/jwtmiddleware.js'
import {authController,userDetails} from "../controllers/auth.controller.js";
import updateController from "../controllers/update.controller.js";
import {postAttendence,updateClassDone} from "../controllers/attendence.controller.js";
const upload=multer({storage:multer.memoryStorage()})

Router.post("/signUp",upload.single('userImg'), async (req, res) => {
  try {
    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ msg: "No data found" });
    }
    if (!req.file) {
      return res.status(400).json({ msg: "No image file uploaded" });
    }
    const hasedPassword=await bcrypt.hash(body.password,10)
    body.password=hasedPassword;
    const NoSQL=new NOSQLUSER({userId:body.registerNumber,userImg:req.file?.buffer})
    await NoSQL.save()
    const imgId= await NOSQLUSER.findOne({userId:body.registerNumber},{_id:1,userId:0,userImg:0})
    body.userImg=imgId._id.toString()
    const newUser = await User.create(body);
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
    res.status(201).json({
      msg: "Data received successfully",
      user: newUser, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});
Router.get("/login",jwtToken,authController)
Router.put('/update',upload.single("userImg"),updateController)
Router.get("/details/:registerNumber",userDetails)
Router.put("/attendence",postAttendence)
Router.get("/updateclass",updateClassDone)
export default Router;
