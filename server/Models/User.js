const mongoose  = require("mongoose")
const Result=require("./Result")
const Test=require("./Test")
const UserScheme=new mongoose.Schema({
   username:{type:String,
    required:true,
unique:true},
    pasword:{type:String,
        match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        required:true},
   firstname:String,
    lastname:String,
    address:{type:String},
    phone:{type:String,
        minLength:9,
    maxLength:10},
    profil:String,
    role:{
        type:String,
        tolowercase:true,
        enum:['user','admin'],
        default:'user',
        required:true
    },
    email:{type:String,
        trim:true,
        tolowercase:true,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    currentTest:Test,
    testsHistory:[Result]

},{timestamps:true})

module.exports=mongoose.model('User',UserScheme)