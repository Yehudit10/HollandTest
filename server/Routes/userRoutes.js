const express=require("express")
const userController=require("../Controllers/userController")
const router=express.Router()
router.get("/",userController.getAllUsers)
router.get("/:id",userController.getUserByID)
router.post("/",userController.addUser)
router.put("/",userController.updateUser)
router.delete("/",userController.deleteUser)
module.exports=router

