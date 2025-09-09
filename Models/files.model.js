import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    file: { type: Buffer, required: true }
});

export default mongoose.model("File", fileSchema);
