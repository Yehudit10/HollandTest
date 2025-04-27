const express=require("express")
const emailController=require("../Controllers/emailController")
const verifyJWT=require("../middleware/verifyJWT")
const router=express.Router()
router.use(verifyJWT)
router.post("/",emailController.sendEmail)

module.exports=router