const mongoose  = require("mongoose")

const TypeScheme=new mongoose.Schema({
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
   }
   

},{})

module.exports=mongoose.model('Type',TypeScheme)