const express=require("express")
const chatSessionController=require("../controllers/chatSessionController")
const verifyJWT=require("../middleware/verifyJWT")
const verifyAdmin=require("../middleware/verifyAdmin")
const router=express.Router()
router.use(verifyJWT)
router.use(verifyAdmin)
router.get("/",chatSessionController.getSessionSum)
module.exports=router