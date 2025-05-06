const mongoose=require("mongoose")
const chatSessionSchema=new mongoose.Schema({
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
     },
     counselorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
     },
     chatStartTime:{
        type:mongoose.Schema.Types.Date,
        required:true
     },
     chatEndTime:{
        type:mongoose.Schema.Types.Date,
        required:true
     },
     durationInMinutes:{
        type:Number,
        required:true
     }
},{timestamps:true})
module.exports=mongoose.model('ChatSession',chatSessionSchema)