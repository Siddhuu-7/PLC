import express from "express"
import multer from "multer"
import { resourceController ,getResourceController,fileController} from "../controllers/resource.controller.js"
const router=express.Router()
const upload=multer({storage:multer.memoryStorage()})
router.post("/upload",upload.single("file"),resourceController)
router.get("/getdata",getResourceController)
router.get("/getfile",fileController)
export default router