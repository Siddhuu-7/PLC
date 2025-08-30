import testModel from "../Models/test.model.js"
export default async function(req,res,next){
    try {
        const testId=req.params.testId
        const testData=await testModel.find({testId})
        if(!testData){
            return res.status(200).json({msg:"can Find Test"})
        }
        res.status(200).json({testData})
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}