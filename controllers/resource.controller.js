import resourceModel from "../Models/resorce.model.js";
import fileModel from "../Models/files.model.js";

async function resourceController(req, res, next) {
    try {
        const body = req.body;
console.log(body)
       if (req.file && body.file !== "null") {
    const fileDoc = new fileModel({
        filename: req.file.originalname,   
        mimetype: req.file.mimetype,      
        size: req.file.size,               
        file: req.file.buffer              
    });

    await fileDoc.save();
    body.file = fileDoc._id;
}


        const resourceDoc = new resourceModel(body);
        await resourceDoc.save();

        res.status(200).json({ msg: "shared" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function getResourceController(req, res, next) {
    try {
        const data = await resourceModel.find();
        res.status(200).json({  data });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function fileController(req, res, next) {
    try {
        const { id } = req.query; 

        const fileDoc = await fileModel.findById(id);

        if (!fileDoc) {
            return res.status(404).json({ msg: "File not found" });
        }

       
        const filename = fileDoc.filename || "downloaded_file";
        const mimetype = fileDoc.mimetype || "application/octet-stream";

        res.set({
            "Content-Type": mimetype,
            "Content-Disposition": `attachment; filename="${filename}"`,
        });

        res.send(fileDoc.file); 
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



export { resourceController, getResourceController ,fileController};
