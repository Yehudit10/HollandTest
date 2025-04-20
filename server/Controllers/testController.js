const Test=require("../Models/Test")
// const getAllTests=async(req,res)=>{
// const tests=await Test.find().lean()
// if(!tests)
// return res.status(400).json({error:true,message:"no tests found",data:null})
// return res.status(200).json({error:false,message:"",data:tests})
// }
// const addTest=async(req,res)=>{
//     // const {userId}=req.body
//     // if(!userId)
//     // return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
//     //const newTest=await Test.create({userId})
//     const newTest=await Test.create({userId:req.user._id})
//     if(!newTest)
//    return res.status(400).json({error:true,message:"create failed",data:null})
//    return res.status(201).json({error:false,message:null,data:newTest})

// }

const addTest=async(req,res)=>{
    const {test}=req.body
    const newTest=await (await Test.create({userId:req.user._id,test:test?.map((q)=>({question:q._id}))}))
    if(!newTest)
   return res.status(400).json({error:true,message:"create failed",data:null})
   return res.status(201).json({error:false,message:null,data:newTest})

}
// const getTestByID=async(req,res)=>{
//     const {id}=req.params
//     if(!id)
//     return res.status(400).json({error:true,message:"id is required",data:null})
//     const test=await Test.findById(_id).lean()
//     if(!test)
//     return res.status(400).json({error:true,message:"test not found",data:null})
//    return res.status(200).json({error:false,message:null,data:test})
    
// }
const getTest=async(req,res)=>{ 
    const test=await Test.findOne({userId:req.user._id}).populate("test.question").lean()
    if(!test)
        return res.status(204).send()//.json({error:false,message:"no content",data:null})
   return res.status(200).json({error:false,message:null,data:test})
    
}

const updateTest=async(req,res)=>{
    const {_id,test}=req.body
    if(!_id)
    return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
    const foundtest=await Test.findById(_id).exec()
    foundtest.userId=req.user._id
    foundtest.test=test
    const updatedTest=await foundtest.save()
    if(!updatedTest)
    return res.status(400).json({error:true,message:"update failed",data:null})
    return res.status(200).json({error:false,message:null,data:updatedTest})
}
const deleteTest=async(req,res)=>{
    const {_id}=req.body
    if(!_id)
        return res.status(400).json({error:true,message:"id is required",data:null})
    const test=await Test.findById(_id).exec()
    if(!test)
        return res.status(400).json({error:true,message:"test not found",data:null})
    const deletedTest=await Test.deleteOne()
    if(!deletedTest)
        return res.status(400).json({error:true,message:"delete failed",data:null})
        return res.status(200).json({error:false,message:null,data:deletedTest})
    
   }
module.exports={getTest,updateTest,addTest,deleteTest}