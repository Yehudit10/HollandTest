const mongoose  = require("mongoose")
const Type=require("./Type")
const Question=require("./Question")
const Chapter=require("./Chapter")
const uncompletedTestScheme=new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId},
   // answers:[
   //    {
   //    // questionID:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Question'},
   //    questionChapter:{  type:String,
   //       enum:['work','capability','interest'],
   //       required:true},
   //    questionType:{
   //       type:String,enum:['R','I','A','S','E','C'],
   //    required:true
   //    },
   //    questionresult:{type:Number,min:1,max:5,required:true}
   // }
   // ]
   answers:[
      {
      // questionID:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Question'},
      questionChapter:{  type:mongoose.Schema.ObjectId,
        ref:'Chapter',
         required:true},
      questionType:{
         type:mongoose.Schema.ObjectId,
         ref:'Type',
      required:true
      },
      questionresult:{type:Number,min:1,max:5,required:true}
   }
   ]
,
currentQuestion:
{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Question'},
// result:
// [{type:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Type'},
// activitysum:{type:Number,required:true},
// professionsum:{type:Number,required:true},
// abilitysum:{type:Number,required:true},
// select:{type:Boolean,required:true}}],

 },
{timestamps:true})

//module.exports=uncompleteTestScheme
module.exports=mongoose.model('UncompletedTest',uncompletedTestScheme)