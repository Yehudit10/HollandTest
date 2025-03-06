const jwt=require("jsonwebtoken")
const VerifyStudent=(req,res,next)=>{
    const {student_id}=req.params
    const authHeader=req.headers.authorization||req.headers.authorization
    if(!aythHeader?.startsWith('Bearer '))
        return res.status(401).json({msg:'Unauthorized'})
    const token=authHeader.split(' ')[1]
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(err)
        return res.status(403).json({msg:'Forbidden'})
           req.
    })
}
