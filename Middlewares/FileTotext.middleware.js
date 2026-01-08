import { Fileparser } from "../utils/fileTotext.js";
export default function (req, res, next) {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ msg: "File not found" });
    }

    const fileText = req.file.buffer.toString("utf-8");

    req.body.fileText = Fileparser(fileText);

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}


