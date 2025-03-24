

const verifyAdmin=(req,res,next)=>{
   
if(!req.user?.role==="admin")
return res.status(401).json({error:true,message:"UnAuthorized Admin",data:null})
next(req,res)
}
module.exports=verifyAdmin