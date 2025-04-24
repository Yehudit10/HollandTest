
const bcrypt=require("bcrypt")
const User=require("../Models/User")


const getAllUsers=async(req,res)=>{
 const users=   await User.find({},{password:0}).lean()
if(!users)
    return res.status(400).json({error:true,message:"no users found",data:null})
return res.status(200).json({error:false,message:"",data:users})
}

const getUserByID=async(req,res)=>{
   
    const user=await User.findById(req.user._id,{password:0}).lean()
    if(!user)
        return res.status(400).json({error:true,message:"no user found",data:null})
    return res.status(200).json({error:false,message:"",data:user})
}
const addUser=async(req,res)=>{
    const {username,password,firstname,lastname,address,phone,email}=req.body
    const profil=req.file?.filename||""
   if(!password||!username||!email)
   return res.status(400).json({error:true,message:"you are missing some required fields",data:null})
const duplicate=await User.findOne({username}).lean()
if(duplicate)
    return res.status(400).json({error:true,message:"there is already exist a user by this name",data:null})
const hashedpassword=await bcrypt.hash(password,10)
const newUser={password:hashedpassword,username,firstname,lastname,address,profil,email}
if(phone)
newUser.phone=phone
   const user=await User.create(newUser)
   if(!user)
   return res.status(400).json({error:true,message:"create failed",data:null})

   return res.status(201).json({error:false,message:"",data:user})

}
const updateUser=async(req,res)=>{
    const {password,username,firstname,lastname,address,phone,email,favoraites}=req.body
    if(!username||!email)
        return res.status(400).json({error:true,message:"you are missing required fields",data:null})
        const duplicate=await User.findOne({username,_id:{$ne:req.user._id}}).lean()
        if(duplicate)
        return res.status(400).json({error:true,message:"there is already exist a user by this name",data:null})
    const user=await User.findById(req.user._id).exec()
    if(!user)
        return res.status(400).json({error:true,message:"user not found",data:null})
    if(password)
        {
            user.password=await bcrypt.hash(password,10)
        }
    user.firstname=firstname
    user.lastname=lastname
    user.address=address
    user.phone=phone
    user.favoraites=favoraites
    if(req.file)
    user.profil=req.file.filename
    user.email=email
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
        return res.status(200).json({error:false,message:null,data:deletedUser})
    
   }
   module.exports={deleteUser,updateUser,getAllUsers,getUserByID,addUser}
