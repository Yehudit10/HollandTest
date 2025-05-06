const ChatSession=require("../models/ChatSession")

const getMySessions=async(req,res)=>{
 const sessions=await ChatSession.find({
    $or: [{ userId: req.user._id }, { counselorId: req.user._id }],
  }).lean()
if(!sessions)
    return res.status(400).json({error:true,message:"no sessions found",data:null})
return res.status(200).json({error:false,message:"",data:sessions})
}
const getSessionSum=async(req,res)=>{

    const now = new Date();
    const {fromMonth=new Date(now.getFullYear(), now.getMonth() - 11, 1),toMonth=new Date()}=req.query
    const fromDate=new Date(fromMonth)
    const toDate=new Date(toMonth)

const sessionsByCounselors = await ChatSession.aggregate([
    {
      $match: {
        createdAt: { $gte: fromDate,$lte:toDate } ,
      }
    },
    
   {
    $group: {
        _id: "$counselorId",
        totalDuration: { $sum: "$durationInMinutes" },
        sessionCount: { $sum: 1 }
      }
    },
    {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "counselor"
        }
      },
      {
        $project: {
          _id: 1,
          //counselorId: "$_id",
          counselorUsername: "$counselor.username", 
          totalDuration: 1,
          sessionCount: 1
        }
      }

  ])
  if(!sessionsByCounselors)
  return res.status(400).json({error:true,message:"no sessions found",data:null})
return res.status(200).json({error:false,message:"",data:sessionsByCounselors})


}
const addSession=async({userId,counselorId,chatStartTime,chatEndTime})=>{
    if(!userId||!counselorId||!chatStartTime||!chatEndTime)
        return new Error("missing required fields")
    const newSession=await ChatSession.create({userId,counselorId,chatStartTime,chatEndTime,durationInMinutes:(chatEndTime - chatStartTime) / 1000*60})
    if(!newSession)
        return new Error("creating failed")
return newSession
}

module.exports={getMySessions,addSession,getSessionSum}