
const verifyUserOrAdmin=(req,res,next)=>{
   
    if(!req.user?.role==="admin"&&req.params._id!=req.user._id)
    return res.status(401).json({error:true,message:"UnAuthorized Admin",data:null})
    next()
    }
    module.exports=verifyUserOrAdmin