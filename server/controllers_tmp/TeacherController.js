const Teacher=require("../models/Teacher")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const getAllTeachers=async(req,res)=>{
    const teachers=await Teacher.find().populate().lean()
    if(!teachers)
        return res.status(400).send("no teachers")
    res.json(teachers)
    }
    const getTeacherByID=async(req,res)=>{
        const teachers=await Teacher.findById(req.user._id).lean()
        if(!teachers)
            return res.status(400).send("no teachers")
        res.json(teachers)
    }
        const signUp=async(req,res)=>{
            const {id,password,name,lastname,address,phone,profil,email,classes}=req.body
            if(!id||!password||!name||!lastname||!address||!phone||!classes)
             return res.status(400).send("some fields are required")
            const duplicate=await Teacher.findOne({id:id})
            if(duplicate)
                return res.status(400).send("id already exists")
         const hashedpassword=await bcrypt.hash(password,10)
            const teacher=await Teacher.create({id,password:hashedpassword,name,lastname,address,phone,role,classes})
            if(!teacher)
             return res.send("failed to create user").status(400)
            res.json(teacher)
        }
        const login=async(req,res)=>{
            const {id,password}=req.query
            const teacher=Teacher.findOne({id:id})
            if(!teacher)
                return res.status(400).send("id or password are not valid")
           const match=await bcrypt.compare(password,teacher.password)
            const TeacherInfo={
                _id:teacher._id,
                id:teacher.id,
                role:"teacher",
                classes:teacher.classes,
            }
          const access_token= jwt.sign(TeacherInfo,process.env.ACCESS_TOKEN)
          res.json({access_token})      
        }
        const updateTeacher=async(req,res)=>{
            const {_id,id,name,lastname,address,phone,profil,email,classes}=req.body
            if(!_id||!id||!password||!name||!lastname||!address||!phone||!classes)
                return res.status(400).send("some fields are required")
            const duplicate=await Teacher.findOne({id:id})
            if(duplicate)
                return res.status(400).send("id already exists")
            const teacher=await Teacher.findById(_id).exec()
            if(!teacher)
               return res.status(400).send("no teacher")
            teacher.id=id
            teacher.name=name
            teacher.lastname=lastname
            teacher.address=address
            teacher.phone=phone
            teacher.profil=profil
            teacher.email=email
            teacher.classes=classes
            const savedTeacher=await teacher.save()
            if(!savedTeacher)
                return res.status(400).send("update failed")
            res.json(savedTeacher)
           }
           const deleteTeacher=async(req,res)=>{
            const {_id}=req.body
            if(!_id)
                return res.status(400).send("_id is required")
            const teacher=await Teacher.findById(_id).exec()
            if(!teacher)
               return res.status(400).send("no teacher")
            await teacher.deleteOne()
           }
    module.exports={getAllTeachers,signUp,login,updateTeacher,deleteTeacher,getTeacherByID}
