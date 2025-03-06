const mongoose=require("mongoose")
const resultSchema= new mongoose.Schema({  
    R:{workSum:{type:Number,required:true},capabilitySum:{type:Number,required:true},interestSum:{type:Number,required:true},select:{type:Boolean,required:true}},
    I:{workSum:{type:Number,required:true},capabilitySum:{type:Number,required:true},interestSum:{type:Number,required:true},select:{type:Boolean,required:true}},
    A:{workSum:{type:Number,required:true},capabilitySum:{type:Number,required:true},interestSum:{type:Number,required:true},select:{type:Boolean,required:true}},
    S:{workSum:{type:Number,required:true},capabilitySum:{type:Number,required:true},interestSum:{type:Number,required:true},select:{type:Boolean,required:true}},
    E:{workSum:{type:Number,required:true},capabilitySum:{type:Number,required:true},interestSum:{type:Number,required:true},select:{type:Boolean,required:true}},
    C:{workSum:{type:Number,required:true},capabilitySum:{type:Number,required:true},interestSum:{type:Number,required:true},select:{type:Boolean,required:true}},
},{timestamps:true})

module.exports=resultSchema