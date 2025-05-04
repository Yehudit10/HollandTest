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
const verifyActiveCounselor=require("../middleware/verifyActiveCounsler")
const verifyAdmin=require("../middleware/verifyAdmin")
router.post("/",upload.single("imgUrl"),userController.addUser)
router.use(verifyJWT)

router.put("/",upload.single("imgUrl"),userController.updateUser)
router.get("/me",userController.getUserByID)///id instead???
router.use(verifyActiveCounselor)
router.delete("/",userController.deleteUser)
router.get("/",userController.getAllUsers)
router.get("/counselor",userController.getAllCounslers)
router.use(verifyAdmin)
router.post("/counselor",userController.addCounsler)
router.get("/stat",userController.getUsersStatistics)
module.exports=router

