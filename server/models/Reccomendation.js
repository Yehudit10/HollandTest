const mongoose  = require("mongoose")
const ReccomendationScheme=new mongoose.Schema({

   stars:{
      type:Number,
      required:true,
      min:1,
      max:5
     },
 
  text:String,
  by:{
     type:mongoose.Schema.Types.ObjectId,
     
  }
},{})
module.exports=mongoose.model('Reccomendation',ReccomendationScheme)