const express=require("express")
const multer=require("multer")
const emailController=require("../controllers/emailController")
const {sendEmail}=require("../email/emailService")
const verifyJWT=require("../middleware/verifyJWT")
const router=express.Router()
const upload = multer({ storage: multer.memoryStorage() });
router.use(verifyJWT)
router.post("/" ,upload.single('pdf'),async (req, res)=>sendEmail({...req.body,file:req.file}))



module.exports=router