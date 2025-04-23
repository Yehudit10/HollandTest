const Job=require("../Models/Job")
const getAllJobs=async(req,res)=>{
    const {q,minWorkingHours,maxWorkingHours,educationLevel,minSalary,maxSalary,sortBy,limit}=req.query 
const query={
    jobname:{$regex:`${q||""}`,$options:"i"},
    workingHoursAvg:{$gte:(minWorkingHours||0),$lte:(maxWorkingHours||100)},
    salaryAvg:{$gte:(minSalary||0),$lte:(maxSalary||1000000)}
} 
if(educationLevel?.split(",").filter(level=>level.trim())?.length>0)
query.educationLevel= {$in:educationLevel.split(",")} 
 
const jobs=await Job.find(query).lean().sort(sortBy).limit(limit)
if(!jobs)
return res.status(400).json({error:true,message:"no jobs found",data:null})

return res.status(200).json({error:false,message:"",data:jobs})
}
const addJob=async(req,res)=>{
    const {jobname,description,salaryAvg,workingHoursAvg,educationLevel,relatedTypes}=req.body
    if(!jobname||!description||!relatedTypes)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const newJob=await Job.create({jobname,description,salaryAvg,educationLevel,workingHoursAvg,relatedTypes})
    if(!newJob)
   return res.status(400).json({error:true,message:"create failed",data:null})
   return res.status(201).json({error:false,message:null,data:newJob})

}
const updateJob=async(req,res)=>{
    const {_id,jobname,description,salaryAvg,workingHoursAvg,educationLevel,relatedTypes}=req.body
    if(!_id||!jobname||!description||!relatedTypes)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const job=await Job.findById(_id).exec()
    job.jobname=jobname
    job.description=description
    job.relatedTypes=relatedTypes
    job.salaryAvg=salaryAvg
    job.workingHoursAvg=workingHoursAvg
    job.educationLevel=educationLevel
    const updatedJob=await job.save()
    if(!updatedJob)
    return res.status(400).json({error:true,message:"update failed",data:null})
    return res.status(200).json({error:false,message:null,data:updatedJob})
}
const deleteJob=async(req,res)=>{
    const {_id}=req.body
    if(!_id)
        return res.status(400).json({error:true,message:"id is required",data:null})
    const job=await Job.findById(_id).exec()
    if(!job)
        return res.status(400).json({error:true,message:"job not found",data:null})
    const deletedJob=await Job.deleteOne()
    if(!deletedJob)
        return res.status(400).json({error:true,message:"delete failed",data:null})
        return res.status(200).json({error:false,message:null,data:deletedJob})
   }
module.exports={getAllJobs,updateJob,addJob,deleteJob}