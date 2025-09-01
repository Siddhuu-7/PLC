import testModel from "../Models/test.model.js"
export default async function (req,res,next) {
    try {
        const alltestdata=await testModel.find({},{test:0})
        if(alltestdata.length<1){
            return res.status(200).json({msg:"No tests currently avalibale"})
        }
        res.status(200).json({alltestdata})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}