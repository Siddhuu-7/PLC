import express from "express";
const Router = express.Router();
import { Admin,NOSQLUSER } from "../Models/admin.model.js";
import multer from "multer";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import jwtToken from '../Middlewares/jwtmiddleware.js'
import {AdminauthController,AdminDetailsController,picsController} from "../controllers/admin.auth.controller.js";
const upload=multer({storage:multer.memoryStorage()})
import adminUpdateCotroller from "../controllers/adminUpdate.cotroller.js";
import announcementModel from "../Models/announcement.model.js";
import {User} from "../Models/users.model.js"
import {partialUser} from "../Models/partialUser.model.js"
import { where } from "sequelize";
import { addToAtttendence } from "../controllers/attendence.controller.js";
import { classDoneModel } from "../Models/attendence.model.js";
Router.post("/signUp",upload.single('file'), async (req, res) => {
  try {
    const body = req.body;
    const admin=req.query.admin
    console.log(body)
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ msg: "No data found" });
    }
   if(!req.file){
    return res.status(200).json({msg:"upload Profile"})
   }
    if(!admin){
      return res.status(403).json({msg:403})
    }
    const hasedPassword=await bcrypt.hash(body.password,10)
    body.password=hasedPassword;
    const NoSQL=new NOSQLUSER({userId:body.registerNumber,userImg:req.file.buffer})
    await NoSQL.save()
    const imgId= await NOSQLUSER.findOne({userId:body.registerNumber},{_id:1,userId:0,userImg:0})
    body.userImg=imgId._id.toString()
    const newUser = await Admin.create(body);
     const token = jwt.sign(
      { token: body.registerNumber },
      process.env.SECREATE_KEY,
      { expiresIn: "21d" }
    );
 res.cookie("token", token, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 21*24*60*60*1000, 
  });
  res.cookie("registerNumber",body.registerNumber,{
     httpOnly: false,
    sameSite: "lax",
    maxAge: 21*24*60*60*1000, 
  })
    res.status(201).json({
      msg: "Data received successfully",
      data: newUser, 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});
Router.get("/login",jwtToken,AdminauthController)
Router.put('/update',upload.single("file"),adminUpdateCotroller)
Router.get('/details',AdminDetailsController)
Router.get("/pics",picsController)
Router.post("/announcement",async(req,res)=>{
  try {
    const data=new announcementModel(req.body)
    data.save()
    res.status(200).json({msg:"recived"})
  } catch (error) {
    res.status(505).json({msg:error.message})
  }
})
Router.get("/getannouncement",async(req,res)=>{
  try {
    const data= await announcementModel.find();
    res.status(200).json({data})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
})
Router.get("/gettodayannouncement", async (req, res) => {
  try {
    const data = await announcementModel
      .findOne() 
      .sort({ createdAt: -1 }); 

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
Router.get("/verify", async (req, res) => {
  try {
    const { verify, registerNumber } = req.query;
    
    const data = await partialUser.findOne({ where: { registerNumber } });
    if (!data) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (verify) {
      const userData = data.toJSON();
      await User.create(userData);

      await partialUser.destroy({ where: { registerNumber } });
    }

    res.status(200).json({ msg: "Verified Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

Router.get("/partialUsers",async(req,res)=>{
  try {
     const data = await partialUser.findAll({
  where: {},
  attributes: { exclude: ['password'] }
});
     if(!data){
      return res.status(200).json({msg:"NO partial Users"})
     }
     res.status(200).json({data})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
})
Router.get("/verifyeduser",async(req,res)=>{
 try {
     const data = await User.findAll({
  where: {},
  attributes: { exclude: ['password'] }
});
     if(!data){
      return res.status(200).json({msg:"NO Users"})
     }
     res.status(200).json({data})
  } catch (error) {
    res.status(500).json({msg:error.message})
    
  }
})
Router.delete("/delete", async (req, res) => {
  try {
    const { registerNumber } = req.query;

    if (!registerNumber) {
      return res.status(400).json({ msg: "registerNumber is required" });
    }

    const deletedCount = await User.destroy({ where: { registerNumber } });

    if (deletedCount === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
Router.get("/isPosted", async (req, res) => {
  try {
    const data = await classDoneModel.findOne();
    if (!data) {
      return res.status(404).json({ msg: "No data found" });
    }

    const today = new Date().toDateString();
    const postedDay = new Date(data.postedAt).toDateString();

    if (today === postedDay) {
      return res.status(200).json({ msg: true });
    }

    res.status(404).json({ msg: "Not Updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default Router;
