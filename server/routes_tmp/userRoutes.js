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
    }
})
const upload=multer({storage:storage})

const userController=require("../controllers/userController")
const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
router.post("/",upload.single("imgUrl"),userController.addUser)
router.post("/counsler",userController.addCounsler)
router.use(verifyJWT)
router.get("/",userController.getAllUsers)
router.get("/counslers",userController.getAllCounslers)
router.get("/stat",userController.getUsersStatistics)
router.get("/me",userController.getUserByID)///id instead???
router.put("/",upload.single("imgUrl"),userController.updateUser)
router.delete("/",userController.deleteUser)
module.exports=router

