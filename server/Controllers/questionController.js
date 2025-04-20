const Question=require("../Models/Question")
const getAllQuestions=async(req,res)=>{
const questions=await Question.find().lean().sort("chapterID")//.populate("chapterID").populate("type").sort(chapterID,questionNum)
if(!questions)
return res.status(400).json({error:true,message:"no questions found",data:null})
return res.status(200).json({error:false,message:"",data:questions})
}
const addQuestion=async(req,res)=>{
    const {type,chapterID,text}=req.body
    if(!type||!chapterID||!text)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    // const duplicate=await Question.findOne({questionNum}).lean()
    // if(duplicate)
    // return res.status(400).json({error:true,message:"question num must be unique",data:null})
    const newQuestion=await Question.create({type,chapterID,text})
    if(!newQuestion)
   return res.status(400).json({error:true,message:"create failed",data:null})
   return res.status(201).json({error:false,message:null,data:newQuestion})

}
const updateQuestion=async(req,res)=>{
    const {_id,type,chapterID,text}=req.body
    if(!_id||!type||!chapterID||!text)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const question=await Question.findById(_id).exec()
    // const duplicate=await Question.findOne({questionNum}).lean()
    // if(duplicate)
    // return res.status(400).json({error:true,message:"question num must be unique",data:null})
    //question.questionNum=questionNum
    question.type=type
    question.chapterID=chapterID
    question.text=text
    const updatedQuestion=await question.save()
    if(!updatedQuestion)
    return res.status(400).json({error:true,message:"update failed",data:null})

    return res.status(200).json({error:false,message:null,data:updatedQuestion})
}
const deleteQuestion=async(req,res)=>{
    const {_id}=req.body
    if(!_id)
        return res.status(400).json({error:true,message:"id is required",data:null})
    const question=await Question.findById(_id).exec()
    if(!question)
        return res.status(400).json({error:true,message:"question not found",data:null})
    const deletedQuestion=await question.deleteOne()
    if(!deletedQuestion)
        return res.status(400).json({error:true,message:"delete failed",data:null})
        return res.status(200).json({error:false,message:null,data:deletedQuestion})
    
   }
module.exports={getAllQuestions,updateQuestion,addQuestion,deleteQuestion}