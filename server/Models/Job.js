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
enum:["","",""]
    },
    relatedTypes:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:'Type'
    }

},{})

module.exports=mongoose.model('Job',jobSchema)