import { User ,NOSQLUSER} from "../Models/users.model"
import bcrypt from "bcrypt"

export default async function (req, res, next) {
  try {
    const { userId, place } = req.body

    switch (place) {
      case "mobileNumber": {
        const  mobileNumber  = req.body.mobileNumber
        await User.update(
          { mobileNumber }, 
          { where: { userId } } 
        )
        break
      }

      case "password": {
        const  password  = req.body.password
        const hashpassword = await bcrypt.hash(password, 10)
        await User.update(
          { password: hashpassword }, 
          { where: { userId } }
        )
        break
      }
      case "userImg":{
        const userImg=req.file.buffer;
        const userImgId=await NOSQLUSER.findOneAndUpdate(
    { userId },             
    { userImg },             
    { new: true, upsert: true } // return updated doc, create if not exists
  )
        await User.update(
          {userImg:userImgId._id},
          {where:{userId}}
        )
      }
      default:
        return res.status(400).json({ msg: "Invalid update field" })
    }

    res.status(200).json({ msg: "Changed Successfully" })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
