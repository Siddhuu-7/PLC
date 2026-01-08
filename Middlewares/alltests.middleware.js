import testModel from "../Models/test.model.js"
import resultsModel from "../Models/results.model.js"
import { User} from '../Models/users.model.js'
 async function alltestsMiddleware(req,res,next) {
    try {
        const alltestdata=await testModel.find({ispublic:true},{programmingProblems:0
            ,questions:0,
            randomizeQuestions:0
            ,totalQuestions:0,
            instructions:0
        })
        if(alltestdata.length<1){
            return res.status(200).json({msg:"No tests currently avalibale"})
        }
        res.status(200).json(alltestdata)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
async function resultsController(req, res, next) {
  try {
    const { testId, registerNumber, answers, submittedAt, timeTaken } = req.body;

    const test = await testModel.findOne({ _id: testId });
    if (!test) return res.status(404).json({ msg: "Test not found" });

  const userData = await User.findOne({
  where: { registerNumber },
  attributes: ['firstName', 'lastName']  
});
    if (!userData) return res.status(404).json({ msg: "User not found" });

    const name = `${userData.firstName} ${userData.lastName}`;
    let score = 0;
    const mcqEvaluation = {};

    (test.questions || []).forEach((q, idx) => {
      const userAnswer = answers?.[idx];
      const correct = q.correctAnswer;
      const isCorrect = userAnswer === correct;

      mcqEvaluation[idx] = {
        question: q.question,
        userAnswer,
        correctAnswer: correct,
        isCorrect,
        marks: isCorrect ? q.marks : 0,
      };

      if (isCorrect) score += q.marks;
    });

    const passMark = (test.totalMarks || 0) * 0.25;
    const status = score >= passMark ? "Passed" : "Failed";

    const resultData = {
      testId,
      registerNumber,
      name,
      submittedAt,
      timeTaken,
      totalScore: score,
      totalMarks: test.totalMarks,
      mcqEvaluation,
      status,
    };

    const results = new resultsModel({
      testId,
      registerNumber,
      name,
      score: resultData.totalScore,
      status: resultData.status,
    });
    await results.save();

    res.status(200).json({
      msg: "MCQ results calculated",
      result: resultData,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function ScoreController(req,res,next) {
    try {
        const {testId}=req.query
        const data =await resultsModel.find({testId})
        if(!data){
            return res.status(200).json({msg:"no data Found"})
        }
        res.status(200).json(data)
    } catch (error) {
    res.status(500).json({msg:error.message})

    }
}


export {resultsController,alltestsMiddleware,ScoreController}