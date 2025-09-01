import {NOSQLUSER, User} from '../Models/users.model.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { attendence } from '../Models/attendence.model.js';
async function authController(req,res,next){
    try {
        const decoded=req.user
        if(decoded.token){
            const token = jwt.sign(
                  { token: decoded.token },
                  process.env.SECREATE_KEY,
                  { expiresIn: "21d" }
                );
             res.cookie("token", token, {
                httpOnly: false,
                sameSite: "lax",
                maxAge: 21*24*60*60*1000, 
              });
              

            res.cookie("registerNumber",decoded.token,{
                  httpOnly: false,
                sameSite: "lax",  
                // secure: process.env.NODE_ENV === "production", 
                maxAge: null 
            })
             res.status(200).json({msg:"true"})
             return
        }
        res.status(200).json({msg:false})

    } catch (error) {
      console.log(error)
        res.status(500).json({msg:error.message})
    }
}
async function loginController(req,res,next) {
  try {
            const {registerNumber,password}=req.body
            
            const data = await User.findOne({
              where: { registerNumber }
            });       
               
                if(!data){
                return res.status(200).status({msg:"no user Found"})
            }
            const isMatch = await bcrypt.compare(password, data.password);
            if(!isMatch){
                return res.status(200).json({msg:"password Not matched"})
            }
              const token = jwt.sign(
                  { token: data.registerNumber },
                  process.env.SECREATE_KEY,
                  { expiresIn: "21d" }
                );
             res.cookie("token", token, {
                httpOnly: false,
                sameSite: "lax",
                maxAge: 21*24*60*60*1000, 
              });
            res.cookie("registerNumber",registerNumber,{
                  httpOnly: false,
                sameSite: "lax",  
                maxAge: null 
            })
            return res.status(200).json({msg:"login success"})
        }
  catch (error) {
    res.status(500).json({msg:error})
  }
}
async function userDetails(req,res,next) {
  try {
    const {registerNumber}=req.params
const data = await User.findOne({
  where: { registerNumber },
  attributes: { exclude: ['password'] }
});
    res.status(200).json({data})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}
async function picsController(req,res,next) {
  try {
const registerNumber = req.query.registerNumber
    const data=await NOSQLUSER.findOne({userId:registerNumber},{userImg:1})
    res.set("Content-Type", "image/png"); 
    res.send(data.userImg);
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}
async function getAttendence(req,res,next) {
  try {
    const registerNumber=req.query.registerNumber
    const data=await attendence.findOne({
      where:{registerNumber}
    })
    res.status(200).json({data})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}
async function clearCookies(req,res,next) {
  try {
   res.clearCookie("token", {
  httpOnly: false,
  secure: false,
  sameSite: "lax",
  path: "/"
});
res.clearCookie("registerNumber", {
  httpOnly: false,
  secure: false,
  sameSite: "lax",
  path: "/"
});
res.status(200).json({ msg: "cleared" });

    res.status(200).json({msg:"cleared"})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}
export {clearCookies, authController,userDetails,loginController,picsController,getAttendence}