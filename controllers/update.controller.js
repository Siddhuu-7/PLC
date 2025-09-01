import { Json } from "sequelize/lib/utils"
import { User ,NOSQLUSER} from "../Models/users.model.js"
import bcrypt from "bcrypt"

export default async function (req, res, next) {
  try {
    const { registerNumber, place } = req.body
    switch (place) {
      case "mobileNumber": {
        const  mobileNumber  = req.body.field
        await User.update(
          { mobileNumber }, 
          { where: { registerNumber } } 
        )
        break
      }

      case "password": {
        const  password  = req.body.field
        const hashpassword = await bcrypt.hash(password, 10)
        await User.update(
          { password: hashpassword }, 
          { where: { registerNumber } } 
        )
        break
      }
      case "userImg":{
        const userImg=req.file.buffer;
        const userImgId=await NOSQLUSER.findOneAndUpdate(
    { userId:registerNumber },             
    { userImg },             
    { new: true, upsert: true } // return updated doc, create if not exists
  )
        await User.update(
          {userImg:userImgId._id.toString()},
          { where: { registerNumber } } 
        )
        break;
      }
      case "courses":{
        let courses=req.body.field
       
        await User.update({courses:courses},{
          where:{registerNumber}
        })
        break;
      }
      default:
        return res.status(400).json({ msg: "Invalid update field" })
    }

    res.status(200).json({ msg: "Changed Successfully" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
