const verifyActiveCounselor=(req,res,next)=>{
   
    if(!req.user.isActive&&req.user.role==="counselor")
    return res.status(401).json({error:true,message:"UnAuthorized Counselor",data:null})
    next()
    }
    module.exports=verifyActiveCounselor