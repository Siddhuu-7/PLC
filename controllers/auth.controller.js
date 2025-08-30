import {User} from '../Models/users.model.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
async function authController(req,res,next){
    try {
        const decoded=req.user
        if(decoded.userId){
            const token = jwt.sign(
                  { userId: decoded.userId },
                  process.env.SECREATE_KEY,
                  { expiresIn: "21d" }
                );
             res.cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 21*24*60*60*1000, 
              });
              

            res.cookie("userId",decoded.userId,{
                  httpOnly: false,
                sameSite: "lax",  
                // secure: process.env.NODE_ENV === "production", 
                maxAge: null 
            })
             res.status(200).json({msg:true})
        }else{
            const {registerNumber,password}=req.body
const data = await User.findOne({
  where: { registerNumber }
});            if(!data){
                return res.status(204).status({msg:"no user Found"})
            }
            const isMatch = await bcrypt.compare(password, data.password);
            if(!isMatch){
                return res.status(200).json({msg:false})
            }
              const token = jwt.sign(
                  { userId: data.registerNumber },
                  process.env.SECREATE_KEY,
                  { expiresIn: "21d" }
                );
             res.cookie("token", token, {
                httpOnly: false,
                sameSite: "lax",
                maxAge: 21*24*60*60*1000, 
              });
            res.cookie("userId",userId,{
                  httpOnly: true,
                sameSite: "lax",  
                maxAge: null 
            })
            return res.status(200).json({msg:true})
        }
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
async function userDetails(req,res,next) {
  try {
    const {registerNumber}=req.params
    const data=await User.findOne({registerNumber})
    res.status(200).json({data})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}
export { authController,userDetails}