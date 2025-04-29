const Student=require("../models/Student")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const getAllStudents=async(req,res)=>{
    const students=await Student.find().populate().lean()
    if(!students)
        return res.status(400).send("no students")
    res.json(students)
    }
    const getStudentsByClass=async(req,res)=>{
        const {classid}=req.params
        const students=await Student.find({student_class:classid}).lean()
        if(!students)
            return res.status(400).send("no students")
        res.json(students)
    }
        const signUp=async(req,res)=>{
            const {id,password,name,lastname,address,phone,profil,email,student_class}=req.body
            if(!id||!password||!name||!lastname||!address||!phone||!student_class)
             return res.status(400).send("some fields are required")
            const duplicate=await Student.findOne({id:id})
            if(duplicate)
                return res.status(400).send("id already exists")
         const hashedpassword=await bcrypt.hash(password,10)
            const student=await Student.create({id,password:hashedpassword,name,lastname,address,phone,role,student_class})
            if(!student)
             return res.send("failed to create user").status(400)
            res.json(student)
        }
        const login=async(req,res)=>{
            const {id,password}=req.query
            const student=Student.findOne({id:id})
            if(!student)
                return res.status(400).send("id or password are not valid")
           const match=await bcrypt.compare(password,student.password)
            const StudentInfo={
                _id:student._id,
                id:student.id,
                role:"student",
                class:student.class,
            }
          const access_token= jwt.sign(StudentInfo,process.env.ACCESS_TOKEN)
          res.json({access_token})      
        }
        const updateStudent=async(req,res)=>{
            const {_id,id,name,lastname,address,phone,profil,email,student_class}=req.body
            if(!_id||!id||!name||!lastname||!address||!phone||!student_class)
                return res.status(400).send("some fields are required")
            const duplicate=await Student.findOne({id:id})
            if(duplicate)
                return res.status(400).send("id already exists")
            const student=await Student.findById(_id).exec()
            if(!student)
               return res.status(400).send("no student")
            student.id=id
            student.name=name
            student.lastname=lastname
            student.address=address
            student.phone=phone
            student.profil=profil
            student.email=email
            student.student_class=student_class
            const savedStudent=await student.save()
            if(!savedStudent)
                return res.status(400).send("update failed")
            res.json(savedStudent)
           }
           const deleteStudent=async(req,res)=>{
            const {_id}=req.body
            if(!_id)
                return res.status(400).send("_id is required")
            const student=await Student.findById(_id).exec()
            if(!student)
               return res.status(400).send("no student")
            await student.deleteOne()
           }
    module.exports={getAllStudents,signUp,login,updateStudent,deleteStudent,getStudentsByClass}
