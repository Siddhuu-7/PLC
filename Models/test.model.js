import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
  correctAnswer: { type: Number },
  difficulty: { type: String },
  marks: { type: Number },   
  options: [{ type: String }], 
  question: { type: String },
  type: { type: String }
});

const testCaseSchema = new mongoose.Schema({
  input: { type: String },
  output: { type: String }
});

const programmingProblemSchema = new mongoose.Schema({
  description: { type: String },
  marks: { type: Number },
  memoryLimit: { type: Number },
  timeLimit: { type: Number },
  title: { type: String },
  type: { type: String },
  testCases: [testCaseSchema]    
});

const testSchema = new mongoose.Schema({
  testId: {
    type: Number,
    required: true,
    unique: true,
  },
  testName: {
    type: String,
    required: true,
  },
  testSubject: {
    type: String,
    required: true,
  },
  duration: { type: Number },
  totalMarks: { type: Number },
  allowedAttempts: { type: String },
  instructions: { type: String },
  programmingProblems: [programmingProblemSchema],
  questions: [questionsSchema],
  randomizeQuestions: { type: Boolean },
  totalQuestions: { type: Number },
  ispublic:{type:Boolean,default:true}
});

const testModel = mongoose.model("Test", testSchema);

export default testModel;
