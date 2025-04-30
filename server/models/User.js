const mongoose  = require("mongoose")
const UserScheme=new mongoose.Schema({
   username:{type:String,
    required:true,
unique:true},
    password:{type:String,
        match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        required:true},
   firstname:String,
    lastname:String,
    address:{type:String},
    phone:String,
    imgUrl:String,
    role:{
        type:String,
        tolowercase:true,
        enum:['user','admin','counselor'],
        default:'user',
        required:true
    },
    email:{type:String,
        trim:true,
        tolowercase:true,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    favoraites:[{
       type:mongoose.Schema.Types.ObjectId,
        ref:'Job'
    }],
    profile:String,
    isActive:{
        type:Boolean,
        default:true
    }
    //currentTest:UncompletedTest,
    // testsHistory:[Result]

},{timestamps:true})

module.exports=mongoose.model('User',UserScheme)