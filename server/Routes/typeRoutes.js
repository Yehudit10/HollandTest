const express=require("express")
const typeController=require("../Controllers/typeController")
const verifyJWT=require("../middleware/verifyJWT")
const router=express.Router()
router.use(verifyJWT)
router.get("/",typeController.getAllTypes)
module.exports=router