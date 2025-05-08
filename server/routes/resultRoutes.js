const express=require("express")
const reaultController=require("../controllers/resultController")
const verifyJWT=require("../middleware/verifyJWT")
const verifyAdmin=require("../middleware/verifyAdmin")
const router=express.Router()
router.use(verifyJWT)
router.get("/:id",reaultController.getResultsWithSentences)
router.get("/",reaultController.getAllUserResult)
router.post("/",reaultController.addResult)
router.use(verifyAdmin)
router.get("/statistics/all",reaultController.getAllResults)

module.exports=router