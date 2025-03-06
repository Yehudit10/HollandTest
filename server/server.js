require("dotenv").config()
const express=require("express")
const cookieParser=require("cookie-parser")
const mongoose=require("mongoose")
const corsOptions=require("./Config/corsOptions")
const connectToDB=require("./Config/ConnectToDB")
const app=express()
const PORT=process.env.PORT||1500
app.use(cores(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use("/api/users",require("./Routes/userRoutes"))
app.use("/api/auth",require("./Routes/authRoutes"))
app.use("/api/question",require("./Routes/questionRoutes"))
app.use("/api/chapter",require("./Routes/chapterRoutes"))

connectToDB()
mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>{
console.log(`server is running on port ${PORT}`)
})
})
mongoose.connection.on('error',(err)=>{console.log(err)})