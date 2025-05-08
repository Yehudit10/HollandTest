const Job=require("../models/Job")
const getAllJobs=async(req,res)=>{
    const {q="",minWorkingHours,maxWorkingHours,educationLevel,minSalary,maxSalary,sortBy="jobname",page,pageSize}=req.query 
const query={
    jobname:{$regex:`${q}`,$options:"i"}
} 
if(educationLevel?.split(",").filter(level=>level.trim())?.length>0)
query.educationLevel= {$in:educationLevel.split(",")} 
if(minSalary)
query.salaryAvg={$gte:minSalary}
if(maxSalary)
query.salaryAvg={...(query.salaryAvg||{}),$lte:maxSalary}
if(minWorkingHours)
query.workingHoursAvg={$gte:minWorkingHours}
if(maxWorkingHours)
query.workingHoursAvg={...(query.workingHoursAvg||{}),$lte:maxWorkingHours}
const jobs=await Job.find(query).sort(sortBy).skip(page*pageSize||0).limit(pageSize).lean()
if(!jobs)
return res.status(400).json({error:true,message:"no jobs found",data:null})
const totalCount = await Job.countDocuments(query);
const hasMore = totalCount > (Number(page) + 1) * pageSize;
return res.status(200).json({error:false,message:"",data:{jobs,hasMore}})
}
const addJob=async(req,res)=>{
    const {jobname,description,salaryAvg,workingHoursAvg,educationLevel,relatedTypes}=req.body
    if(!jobname||!description)//||!relatedTypes)
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
    const {id}=req.body
    if(!id)
        return res.status(400).json({error:true,message:"id is required",data:null})
    const job=await Job.findById(id).exec()
    if(!job)
        return res.status(400).json({error:true,message:"job not found",data:null})
    const deletedJob=await job.deleteOne()
    if(!deletedJob)
        return res.status(400).json({error:true,message:"delete failed",data:null})
        return res.status(200).json({error:false,message:null,data:deletedJob})
   }
module.exports={getAllJobs,updateJob,addJob,deleteJob}