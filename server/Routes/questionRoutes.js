const express=require("express")
const questionController=require("../Controllers/questionController")
const router=express.Router()
router.get("/",questionController.getAllQuestions)
router.post("/",questionController.addQuestion)
router.put("/",questionController.updateQuestion)
router.delete("/",questionController.deleteQuestion)
module.exports=router