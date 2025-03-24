const express=require("express")
const multer=require("multer")
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/uploads")
    },
    filename:function(req,file,cb)
    {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,uniqueSuffix+"-"+file.originalname)
        console.log(file.originalname)
    }
})
const upload=multer({storage:storage})
const userController=require("../Controllers/userController")
const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
router.post("/",upload.single("profil"),userController.addUser)
router.use(verifyJWT)
router.get("/",userController.getAllUsers)
router.get("/:id",userController.getUserByID)
router.put("/",userController.updateUser)
router.delete("/",userController.deleteUser)
module.exports=router

