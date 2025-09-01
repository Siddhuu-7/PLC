import testModel from "../Models/test.model.js"
export default async function(req,res,next){
    try {
        const testId=req.query.testId
        const testData=await testModel.find({testId})
        if(!testData){
            return res.status(200).json({msg:"can Find Test"})
        }
        res.status(200).json({data:testData[0]})
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}