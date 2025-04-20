const mongoose=require("mongoose")
const User=require("./User")
const subResultSchema=new mongoose.Schema({
    work:{type:Number,required:true},
    capability:{type:Number,required:true},
    interest:{type:Number,required:true},
    select:{type:Boolean,required:true}
},{_id:false})
const resultSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    result:{R:{type:subResultSchema,required:true},
            I:{type:subResultSchema,required:true},
            A:{type:subResultSchema,required:true},
            S:{type:subResultSchema,required:true},
            E:{type:subResultSchema,required:true},
            C:{type:subResultSchema,required:true}}
   
},{timestamps:true})

//module.exports=resultSchema
module.exports=mongoose.model('Result',resultSchema)