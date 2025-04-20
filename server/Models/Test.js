const mongoose  = require("mongoose")
const Type=require("./Type")
const Question=require("./Question")
const Chapter=require("./Chapter")
const User=require("./User")
const testScheme=new mongoose.Schema({
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'User'
   },
   //answers:{type:[Number],required:true},
   

   // answers:[
   //    {
   //    questionChapter:{  type:mongoose.Schema.ObjectId,
   //      ref:'Chapter',
   //       required:true},
   //    questionType:{
   //       type:mongoose.Schema.ObjectId,
   //       ref:'Type',
   //    required:true
   //    },
   //    questionResult:{type:Number,min:0,max:4,required:true}
   // }
   // ]




   test:[
       {
      _id:false,
      question:{  type:mongoose.Schema.ObjectId,
        ref:'Question',
         required:true},
      questionResult:{type:Number,min:0,max:4}
   },
   ]   

// ,
// currentQuestion:
// {type:mongoose.Schema.Types.ObjectId,required:true,ref:'Question'},
// result:
// [{type:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Type'},
// activitysum:{type:Number,required:true},
// professionsum:{type:Number,required:true},
// abilitysum:{type:Number,required:true},
// select:{type:Boolean,required:true}}],

 },
{timestamps:true})

//module.exports=uncompleteTestScheme
module.exports=mongoose.model('Test',testScheme)