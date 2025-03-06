const mongoose  = require("mongoose")
const Type=require("./Type")
const Question=require("./Question")
const TestScheme=new mongoose.Schema({
   answers:[
      {questionID:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Question'},
      questionresult:{type:Number,min:0,max:2,required:true}}
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

module.exports=TestScheme