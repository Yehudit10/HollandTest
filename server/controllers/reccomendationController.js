const Reccomendation=require("../models/Reccomendation")
const getAllReccomendations=async(req,res)=>{
const reccomendations=await Reccomendation.find().lean()
if(!reccomendations)
return res.status(400).json({error:true,message:"no Reccomendations found",data:null})
return res.status(200).json({error:false,message:"",data:reccomendations})
}
const getReccomendationById=async(req,res)=>{
    const {_id}=req.params
    const reccomendation=await Reccomendation.findById(_id).lean()
    if(!reccomendation)
        return res.status(400).json({error:true,message:"no Reccomendation found",data:null})
    return res.status(200).json({error:false,message:"",data:reccomendation})
}
const addReccomendation=async(req,res)=>{
    const {stars,text}=req.body
    if(!stars)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const newReccomendation=await Reccomendation.create({reccomendation,title,description})
    if(!newReccomendation)
   return res.status(400).json({error:true,message:"create failed",data:null})
   return res.status(201).json({error:false,message:null,data:newReccomendation})

}
const updateReccomendation=async(req,res)=>{
    const {_id,reccomendation,title,description}=req.body
    if(!_id||!reccomendation||!title||!description)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const foundReccomendation=await Reccomendation.findById(_id).exec()
    foundReccomendation.reccomendation=reccomendation
    foundReccomendation.title=title
    foundReccomendation.description=description
    const updatedReccomendation=await Reccomendation.save()
    if(!updatedReccomendation)
    return res.status(400).json({error:true,message:"update failed",data:null})
    return res.status(200).json({error:false,message:null,data:updatedReccomendation})
}
const deleteReccomendation=async(req,res)=>{
    const {_id}=req.body
    if(!_id)
        return res.status(400).json({error:true,message:"id is required",data:null})
    const reccomendation=await Reccomendation.findById(_id).exec()
    if(!reccomendation)
        return res.status(400).json({error:true,message:"Reccomendation not found",data:null})
    const deletedReccomendation=await reccomendation.deleteOne()
    if(!deletedReccomendation)
        return res.status(400).json({error:true,message:"delete failed",data:null})
    
   }
module.exports={getAllReccomendations,updateReccomendation,addReccomendation,deleteReccomendation,getReccomendationById}