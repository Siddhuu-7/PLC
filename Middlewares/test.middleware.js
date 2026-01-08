import testModel from "../Models/test.model.js";

 async function testMiddleware(req, res, next) {
  try {
    const testId = req.query.testId;

    const testData = await testModel.findOne({ testId });

    if (!testData) {
      return res.status(404).json({ msg: "Test not found" });
    }

   

    res.status(200).json(testData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
async function codeRunnerMiddleWare(req,res,next) {
  try {
    console.log(req.body)
  } catch (error) {
      res.status(500).json({ msg: error.message });
  }
}
async function codeSubmitMiddleWare(req,res,next) {
  try {
    console.log(req.body)
  } catch (error) {
      res.status(500).json({ msg: error.message });
  }
}
export {codeRunnerMiddleWare,testMiddleware,codeSubmitMiddleWare}