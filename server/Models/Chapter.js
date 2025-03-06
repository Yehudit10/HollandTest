const mongoose=require("mongoose")
const chapterSchema=new mongoose.Schema({
    chapterName:{
enum:['work','capability','interest']
    },
    description:{
        type:String,
        required:true
    }
},{})
module.exports=chapterSchema