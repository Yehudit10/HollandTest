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

const PORT=process.env.PORT||1500
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))

app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/auth",require("./routes/authRoutes"))
app.use("/api/questions",require("./routes/questionRoutes"))
app.use("/api/chapters",require("./routes/chapterRoutes"))
app.use("/api/jobs",require("./routes/jobRoutes"))
app.use("/api/results",require("./routes/resultRoutes"))
app.use("/api/tests",require("./routes/testRoutes"))
app.use("/api/types",require("./routes/typeRoutes"))
app.use("/api/email",require("./routes/emailRoutes"))
app.use("/api/sessions",require("./routes/chatSessionRoutes"))
connectToDB()
mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>{
        const server = http.createServer(app);
        setupSocket(server); 
console.log(`server is running on port ${PORT}`)
})
})
mongoose.connection.on('error',(err)=>{console.log(err)})