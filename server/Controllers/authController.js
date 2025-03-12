const bycrpt=require("bycrypt")
const jwt=require("jsonwebtoken")
const login=async(req,res)=>{
const {username,password}=req.body
if(!username||!password)
return res.status(401).send({error:true,massage:"All fields are required",data:null})
foundUser=await User.findOne({username,password})
if(!foundUser)
return res.status(401).send({error:true,massage:"Unauthorized",data:null})
const match=await bycrpt.compare(password,foundUser.password)
if(!match)
return res.status(401).send({error:true,massage:"Unauthorized",data:null})
const userDetails={
    username:foundUser.username,
    role:foundUser.role,
    currentQuestion:foundUser.currentTest.currentQuestion
}
const accessToken=jwt.sign(userDetails,procces.env.ACCESS_TOKEN,{expiresIn:'15m'})
const refreshToken=jwt.sign({username:UserDetails.username},procces.env.REFRESH_TOKEN,{expiresIn:'1d'})
res.cookie("jwt",refreshToken,{
    httpOnly:true,
    maxAge:7*24*60*60*1000
})
res.json({accessToken})
}
const refresh=async(req,res)=>{
    const cookies=req.cookies
    if(!cookies?.get("jwt"))
    {
    return res.status(401).send({error:true,massage:"Unauthorized",data:null})
    }
    const refreshToken=cookies.jwt
    jwt.decode(refreshToken,process.env.REFRESH_TOKEN,decode(err,decode))
    jwt.verify(req.cookie?.get("jwt"),process.env.REFRESH_TOKEN,async(err,decode)=>{
        if(err)
    return res.status(403).send({error:true,massage:"Unauthorized",data:null})
const foundUser=await User.findOne({username:decode.username}).lean()
const userDetails={
    username:foundUser.username,
    role:foundUser.role
}
const accessToken=jwt.sign(userDetails,procces.env.ACCESS_TOKEN,{expiresIn:'15m'})  
res.json({accessToken})     
    })
      
}
const logout=(req,res)=>{
    const cookies=req.cookies
    if(!cookies?.get("jwt"))
    return res.status(204).send({error:true,massage:"No Content",data:null})
    res.clearCookies("jwt",{httpOnly:true})
    return res.json({error:true,massage:"No Content",data:null})
    
}
module.exports={login,refresh,logout}
