
import { Admin ,NOSQLUSER} from '../Models/admin.model.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
 async function AdminauthController(req, res) {
  try {
    const autologin = req.query?.autologin === "true";
    
    const registernumber=req.user?.token
    // ----------------------------
    // CASE 1: AUTO LOGIN
    // ----------------------------
    if (autologin) {
      if (!req.user) {
        return res.status(401).json({ msg: "No user for auto-login" });
      }
      if(!req.user.token){
        return res.status(401).json({msg:"Not VAlid"})
      }
      // refresh token
      const token = jwt.sign(
        { registerNumber: req.user.token }, 
        process.env.SECREATE_KEY,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 21 * 24 * 60 * 60 * 1000,
      });

      res.cookie("registerNumber",registernumber , {
        httpOnly: false,
        sameSite: "lax",
        maxAge: null,
      });

      return res.status(200).json({ msg: true });
    }

    // ----------------------------
    // CASE 2: MANUAL LOGIN
    // ----------------------------
    const { registerNumber, password } = req.query;

    const data = await Admin.findOne({ where: { registerNumber } });
    if (!data) {
      return res.status(404).json({ msg: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Password not matched" });
    }

    const token = jwt.sign(
      { token: data.registerNumber }, 
      process.env.SECREATE_KEY,
      { expiresIn: "21d" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 21 * 24 * 60 * 60 * 1000,
    });
    res.cookie("registerNumber", registerNumber, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: null,
    });

    return res.status(200).json({ msg: true });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error)
  }
}
async function AdminDetailsController(req,res,next) {
  try {
    const {registerNumber,admin}=req.query
    if(admin){
      const data=await Admin.findOne({
        where:{registerNumber},
        attributes: { exclude: ['password'] }
      })
      return res.status(200).json({data})
    }
    res.status(403).json({msg:403})
   
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
export  {AdminauthController,AdminDetailsController,picsController}