const mongoose=require("mongoose")
const jobSchema=new mongoose.Schema({
    jobname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },   
    salaryAvg:{
        type:Number,
    },
    workingHoursAvg:{
    type:mongoose.Schema.Types.Double
    },
    educationLevel:{
type:String,
enum:["ללא תעודת בגרות","תעודת בגרות","על-תיכוני","תואר אקדמאי"]
    },
    // relatedTypes:{
    //     type:[mongoose.Schema.Types.ObjectId],
    //     required:true,
    //     ref:'Type'
    // },
    relatedTypes:{
        type:[{type:{type:mongoose.Schema.Types.ObjectId,ref:'Type',required:true},match:{type:Number,required:true,min:0,max:100}}],
        required:true
    }

},{})

module.exports=mongoose.model('Job',jobSchema)