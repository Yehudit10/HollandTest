const express=require("express")
const testController=require("../controllers/testController")
const verifyJWT=require("../middleware/verifyJWT")

const router=express.Router()
//router.get("/:id",testController.getTestByID)
router.use(verifyJWT)

router.get("/",testController.getTest)
router.post("/",testController.addTest)
router.put("/",testController.updateTest)
router.delete("/",testController.deleteTest)
module.exports=router