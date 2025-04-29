require("dotenv").config()
const express=require("express")
const cookieParser=require("cookie-parser")
const mongoose=require("mongoose")
const corsOptions=require("./config/corsOptions")
const connectToDB=require("./config/connectToDB")
const cors=require("cors")
const http = require("http");
const setupSocket = require("./socketService");
const app=express()
const server = http.createServer(app);
setupSocket(server); 
const PORT=process.env.PORT||1500
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))

app.use("/api/users",require("./Routes/userRoutes"))
app.use("/api/auth",require("./Routes/authRoutes"))
app.use("/api/questions",require("./Routes/questionRoutes"))
app.use("/api/chapters",require("./Routes/chapterRoutes"))
app.use("/api/jobs",require("./Routes/jobRoutes"))
app.use("/api/results",require("./Routes/resultRoutes"))
app.use("/api/tests",require("./Routes/testRoutes"))
app.use("/api/types",require("./Routes/typeRoutes"))
app.use("/api/email",require("./Routes/emailRoutes"))
connectToDB()
mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>{
console.log(`server is running on port ${PORT}`)
})
})
mongoose.connection.on('error',(err)=>{console.log(err)})