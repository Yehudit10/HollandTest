const Chapter=require("../Models/Chapter")
const getAllChapters=async(req,res)=>{
const chapters=await Chapter.find().sort("_id").lean()
if(!chapters)
return res.status(400).json({error:true,message:"no Chapters found",data:null})
return res.status(200).json({error:false,message:"",data:chapters})
}
const getChapterById=async(req,res)=>{
    const {_id}=req.params
    const chapter=await Chapter.findById(_id).lean()
    if(!chapter)
        return res.status(400).json({error:true,message:"no chapter found",data:null})
    return res.status(200).json({error:false,message:"",data:chapter})
}
const addChapter=async(req,res)=>{
    const {chapterName,description}=req.body
    if(!chapterName||!description)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const newChapter=await Chapter.create({chapterName,description})
    if(!newChapter)
   return res.status(400).json({error:true,message:"create failed",data:null})
   return res.status(200).json({error:false,message:null,data:newChapter})

}
const updateChapter=async(req,res)=>{
    const {_id,chapterName,description}=req.body
    if(!_id||!chapterName||!description)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const chapter=await Chapter.findById(_id).exec()
    chapter.chapterName=chapterName
    chapter.description=description
    const updatedChapter=await chapter.save()
    if(!updatedChapter)
    return res.status(400).json({error:true,message:"update failed",data:null})

    return res.status(200).json({error:false,message:null,data:updatedChapter})
}
const deleteChapter=async(req,res)=>{
    const {_id}=req.body
    if(!_id)
        return res.status(400).json({error:true,message:"id is required",data:null})
    const chapter=await Chapter.findById(_id).exec()
    if(!chapter)
        return res.status(400).json({error:true,message:"Chapter not found",data:null})
    const deletedChapter=await chapter.deleteOne()
    if(!deletedChapter)
        return res.status(400).json({error:true,message:"delete failed",data:null})
   }
module.exports={getAllChapters,updateChapter,addChapter,deleteChapter,getChapterById}