const express=require("express")
const jobController=require("../Controllers/jobController")
const router=express.Router()
router.get("/",jobController.getAllJobs)
router.post("/",jobController.addJob)
router.put("/",jobController.updateJob)
router.delete("/",jobController.deleteJob)
module.exports=router