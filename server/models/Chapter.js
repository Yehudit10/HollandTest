const mongoose=require("mongoose")
const chapterSchema=new mongoose.Schema({
    // chapterNum:{
    //     type:Number,
    //     required:true
    // },
    chapterName:{
        type:String,
enum:['work','capability','interest'],
required:true
    },
    title:{
type:String,
required:true
    },
    description:{
        type:String,
        required:true
    }
},{})
module.exports=mongoose.model('Chapter',chapterSchema)
