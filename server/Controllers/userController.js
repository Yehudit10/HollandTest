
const bcrypt=require("bcrypt")
const User=require("../Models/User")


const getAllUsers=async(req,res)=>{
 const users=   await User.find().lean()
if(!users)
    return res.status(400).json({error:true,message:"no users found",data:null})
return res.status(200).json({error:false,message:"",data:users})
}

const getUserByID=async(req,res)=>{
    const user=await User.findById(req.user._id).lean()
    if(!user)
        return res.status(400).json({error:true,message:"no user found",data:null})
    return res.status(200).json({error:false,message:"",data:user})
}
const addUser=async(req,res)=>{
    const {username,password,firstname,lastname,address,phone,profil,email}=req.body
   if(!password||!username||!email)
   return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
const duplicate=await User.find({username}).lean()
if(duplicate)
return res.status(400).json({error:true,message:"there is already exist a user by this name",data:null})
const hashedpassword=await bcrypt.hash(password,10)
   const user=await User.create({password:hashedpassword,username,firstname,lastname,address,phone,profil,email})
   if(!user)
   return res.status(200).json({error:false,message:"",data:user})

}
const updateUser=async(req,res)=>{
    const {_id,password,name,lastname,address,phone,profil,email,currentTest,testhistory}=req.body
    if(!_id||!name||!lastname||!email)
        return res.status(400).json({error:true,message:"you are missing required fields",data:null})
        const duplicate=await User.find({username}).lean()
        if(duplicate)
        return res.status(400).json({error:true,message:"there is already exist a user by this name",data:null})
    const user=await User.findById(_id).exec()
    if(!user)
        return res.status(400).json({error:true,message:"user not found",data:null})
    if(password)
        {
            user.password=await bcrypt.hash(password,10)
        }
    user.name=name
    user.lastname=lastname
    user.address=address
    user.phone=phone
    user.profil=profil
    user.email=email
    user.currentTest=currentTest
    user.testhistory=testhistory
    const savedUser=await user.save()
    if(!savedUser)
        return res.status(400).json({error:true,message:"update failed",data:null})
    return res.status(200).json({error:false,message:"",data:savedUser})
}

const deleteUser=async(req,res)=>{
    const {_id}=req.body
    if(!_id)
        return res.status(400).json({error:true,message:"id is required",data:null})
    const user=await User.findById(_id).exec()
    if(!user)
        return res.status(400).json({error:true,message:"user not found",data:null})
    const deletedUser=await user.deleteOne()
    if(!deletedUser)
        return res.status(400).json({error:true,message:"delete failed",data:null})
    
   }
   module.exports={deleteUser,updateUser,getAllUsers,getUserByID,addUser}
