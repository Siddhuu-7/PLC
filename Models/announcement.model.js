import mongoose from "mongoose";
const announcementSchema = new mongoose.Schema(
  {
    title: String,
    time: String,
    by: String,
  },
  { timestamps: true } 
);

export default mongoose.model("announcement",announcementSchema)