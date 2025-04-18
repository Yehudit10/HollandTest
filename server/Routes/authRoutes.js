const express=require("express")
const authController=require("../Controllers/authController")
const router=express.Router()
router.post("/login",authController.login)
router.get("/refresh",authController.refresh)
router.post("/logout",authController.logout)
module.exports=router