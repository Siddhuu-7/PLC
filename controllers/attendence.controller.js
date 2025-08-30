import {attendence,classDoneModel} from "../Models/attendence.model.js"
async function postAttendence(req,res,next) {
    let {registerNumber,classattend}=req.body
    
    try {
        const held=await attendence.findOne({registerNumber})
        classattend=Number(classattend)+Number(held.classattend)
        await attendence.update({classattend},{
            where:{registerNumber}
        })
        res.status(200).json({msg:"Updated attendence"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


async function updateClassDone(req, res, next) {
    try {

        let classData = await classDoneModel.findOne({ className:"PLC" });

        if (!classData) {
            classData = await classDoneModel.create({ className:"PLC", classDone: 1 });
        } else {
            classData.classDone += 1;
            await classData.save();
        }

        await attendence.update(
            { classHeld: classData.classDone },
            { where: {} }
        );

        res.status(200).json({
            msg: `Class ${"plc"} updated. Total classes done: ${classData.classDone}`
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export {postAttendence,updateClassDone}