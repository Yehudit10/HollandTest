const mongoose=require("mongoose")
const chapterSchema=new mongoose.Schema({
    chapterName:{
        type:String,
enum:['work','capability','interest'],
required:true
    },
    description:{
        type:String,
        required:true
    }
},{})
module.exports=chapterSchema