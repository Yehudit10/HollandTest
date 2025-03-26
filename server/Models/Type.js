const mongoose  = require("mongoose")

const typeScheme=new mongoose.Schema({
   type:{
      type:String,
    enum:['R','I','A','S','E','C'],
    required:true
   },
   title:{
type:String,
requird:true
   },
   description:{
    type:String,
    required:true
   },
   image:{
      type:String,
      required:true
   }

},{})

module.exports=mongoose.model('Type',typeScheme)