const Chapter=require("../Models/Chapter")
const getAllChapters=async(req,res)=>{
const Chapters=await Chapter.find().lean()
if(!Chapters)
return res.status(400).json({error:true,message:"no Chapters found",data:null})
return res.status(200).json({error:false,message:"",data:Chapters})
}
const getChapterById=async(req,res)=>{
    const {_id}=req.params
    const chapter=await Chapter.findById(_id).lean()
    if(!chapter)
        return res.status(400).json({error:true,message:"no chapter found",data:null})
    return res.status(200).json({error:false,message:"",data:chapter})
}
const addChapter=async(req,res)=>{
    const {ChapterName,description}=req.body
    if(!ChapterName||!description)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const newChapter=await Chapter.create({ChapterName,description})
    if(!newChapter)
   return res.status(400).json({error:true,message:"create failed",data:null})
   return res.status(200).json({error:false,message:null,data:newChapter})

}
const updateChapter=async(req,res)=>{
    const {_id,ChapterName,description}=req.body
    if(!_id||!ChapterName||!description)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const Chapter=await Chapter.findById(_id).exec()
    Chapter.ChapterName=ChapterName
    Chapter.description=description
    const updatedChapter=await Chapter.save()
    if(!updatedChapter)
    return res.status(400).json({error:true,message:"update failed",data:null})

    return res.status(200).json({error:false,message:null,data:updatedChapter})
}
const deleteChapter=async(req,res)=>{
    const {_id}=req.body
    if(!_id)
        return res.status(400).json({error:true,message:"id is required",data:null})
    const Chapter=await Chapter.findById(_id).exec()
    if(!Chapter)
        return res.status(400).json({error:true,message:"Chapter not found",data:null})
    const deletedChapter=await user.deleteOne()
    if(!deletedChapter)
        return res.status(400).json({error:true,message:"delete failed",data:null})
    
   }
module.exports={getAllChapters,updateChapter,addChapter,deleteChapter,getChapterById}