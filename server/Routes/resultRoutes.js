const express=require("express")
const reaultController=require("../Controllers/resultController")
const verifyJWT=require("../middleware/verifyJWT")
const router=express.Router()
router.use(verifyJWT)
router.get("/:id",reaultController.getResultsWithSentences)
router.get("/",reaultController.getAllUserResult)
router.post("/",reaultController.addResult)

module.exports=router