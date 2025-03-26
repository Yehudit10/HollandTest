const mongoose  = require("mongoose")
const Type=require("./Type")
const Chapter=require("./Chapter")
const QuestionScheme=new mongoose.Schema({
   questionNum:{
type:Number,
required:true,
unique:true
   },
   type:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Type',
      required:true
     },
 
   chapterID:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Chapter'
   },
  text:{
    type:String,
    required:true
  }

},{})
module.exports=mongoose.model('Question',QuestionScheme)
  // type:{
   //    type:String,
   //    enum:['R','I','A','S','E','C'],
   //    required:true
   //   },