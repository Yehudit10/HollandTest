const express=require("express")
const chapterController=require("../controllers/chapterController")
const router=express.Router()
router.get("/",chapterController.getAllChapters)
router.get("/:id",chapterController.getChapterById)
router.post("/",chapterController.addChapter)
router.put("/",chapterController.updateChapter)
router.delete("/",chapterController.deleteChapter)
module.exports=router