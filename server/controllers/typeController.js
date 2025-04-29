const Type=require("../models/Type")
const getAllTypes=async(req,res)=>{
const types=await Type.find().lean()
if(!types)
return res.status(400).json({error:true,message:"no Types found",data:null})
return res.status(200).json({error:false,message:"",data:types})
}
const getTypeById=async(req,res)=>{
    const {_id}=req.params
    const type=await Type.findById(_id).lean()
    if(!type)
        return res.status(400).json({error:true,message:"no Type found",data:null})
    return res.status(200).json({error:false,message:"",data:type})
}
const addType=async(req,res)=>{
    const {type,title,description}=req.body
    if(!type||!title||!description)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const newType=await Type.create({type,title,description})
    if(!newType)
   return res.status(400).json({error:true,message:"create failed",data:null})
   return res.status(201).json({error:false,message:null,data:newType})

}
const updateType=async(req,res)=>{
    const {_id,type,title,description}=req.body
    if(!_id||!type||!title||!description)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const foundType=await Type.findById(_id).exec()
    foundType.type=type
    foundType.title=title
    foundType.description=description
    const updatedType=await Type.save()
    if(!updatedType)
    return res.status(400).json({error:true,message:"update failed",data:null})

    return res.status(200).json({error:false,message:null,data:updatedType})
}
const deleteType=async(req,res)=>{
    const {_id}=req.body
    if(!_id)
        return res.status(400).json({error:true,message:"id is required",data:null})
    const type=await Type.findById(_id).exec()
    if(!type)
        return res.status(400).json({error:true,message:"Type not found",data:null})
    const deletedType=await type.deleteOne()
    if(!deletedType)
        return res.status(400).json({error:true,message:"delete failed",data:null})
    
   }
module.exports={getAllTypes,updateType,addType,deleteType,getTypeById}