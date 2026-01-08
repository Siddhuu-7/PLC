import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    testId:{type:String},
    registerNumber: { type: String, required: true }, // unique student ID
    name: { type: String, required: true },
    score: { type: Number, required: true },
    status: { type: String, enum: ["Passed", "Failed"], required: true },

  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
