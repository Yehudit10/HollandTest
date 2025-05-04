const { Server } = require("socket.io");
const verifySocketJWT=require("./middleware/verifySocketJWT");
const { addSession } = require("./controllers/chatSessionController");
const availableCounselors = new Map();
const socketsMap = new Map();
const sessionsStartTime=new Map()

function setupSocket(server) {
  
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      credentials: true,
    },
  })
  io.listen(4000);
  io.use(verifySocketJWT)
  io.on("connection", (socket) => {

    const { _id:userId, role } = socket.user
   
    socketsMap.set(userId,socket.id)
    if (role === "user") { 
      socket.emit("availableCounselors", Array.from(availableCounselors.keys()));
    }  

    socket.on("startChat", ({ counselorId,username }) => {
      if (role === "user" && availableCounselors.has(counselorId)) {
        sessionsStartTime.set(socket.id,new Date())
        
        const counselorSocketId = availableCounselors.get(counselorId);
        sessionsStartTime.set(counselorSocketId,new Date())
        const counselorSocket = io.sockets.sockets.get(counselorSocketId);
        if (counselorSocket) {
          availableCounselors.delete(counselorId);
          io.emit("availableCounselors", Array.from(availableCounselors.keys()));
          counselorSocket.emit("chatStarted", {userId,username });
          socket.emit("chatStarted", { counselorId });
        }
      }
    });
   
    socket.on("endChat", async({ otherId }) => {

const startTime=sessionsStartTime.get(socket.id)
sessionsStartTime.delete(socket.id)
sessionsStartTime.delete(socketsMap.get(otherId))
  const newSessionObj={userId:role==='user'?userId:otherId,counselorId:role==='user'?otherId:userId,chatStartTime:startTime,chatEndTime:new Date()}
 const newSession=await addSession(newSessionObj)
console.log(newSession)

      // if (
      //   (role === "user" && activeChats.get(counselorId) === userId) ||
      //   (role === "counselor" && activeChats.has(userId))
      // ) 
      // {
        //const counselorSocketId = availableCounselors.get(counselorId) || socket.id;
        const otherSocket = io.sockets.sockets.get(socketsMap.get(otherId));
       // activeChats.delete(counselorId);
  
        socket.emit("chatEnded");
        if (otherSocket) {
          
          otherSocket.emit("chatEnded");
        }
      //   if(role==="counsler")
      //   availableCounselors.set(userId,socket.id)
      // else
      // availableCounselors.set(otherId,otherSocket.id)

       //io.emit("availableCounselors", Array.from(availableCounselors.keys()));
       // otherSocket.emit("availableCounselors", Array.from(availableCounselors.keys()));
      }
    //}
    
    );
    socket.on("sendMessage", ({profile, to, message }) => {

      const targetSocket = io.sockets.sockets.get(socketsMap.get(to));
      if (targetSocket) {
        targetSocket.emit("receiveMessage", { from: profile, message });
      }
    });

    socket.on("setAvailable", () => {
      
      if (role === "counselor") {
        availableCounselors.set(userId, socket.id);
        io.emit("availableCounselors", Array.from(availableCounselors.keys()))
        // const socketSet = notifyWaitList.get(userId);
        // if (!socketSet) return;
        // socketSet.forEach(socketId=>io.to(socketId).emit(`NotifyCounselorAvailable`, { counselorId:userId })) ;
        // notifyWaitList.delete(userId); 
        io.emit(`NotifyCounselorAvailable-${userId}`,({counselorId:userId}))
      }
    });
  
    socket.on("setUnavailable", () => {
      
      if (role === "counselor") {
        
        availableCounselors.delete(userId);
  
        io.emit("availableCounselors", Array.from(availableCounselors.keys()));
      }
    });
  

    // socket.on("notifyWhenAvailable", ({ counselorId }) => {
    //   if (!notifyWaitList.get(counselorId) )notifyWaitList.set(counselorId,new Set());
    //   if (!notifyWaitList.get(counselorId).has(socket.id)) {
    //     notifyWaitList.get(counselorId).add(socket.id);
    //   }
    // });


    socket.on("disconnect", () => {
      if (role === "counselor") {
        availableCounselors.delete(userId);
        io.emit("availableCounselors", Array.from(availableCounselors.keys()));
      }
    
      // for (const socketSet of notifyWaitList.values()) {
      //   socketSet?.delete(socket.id);
      // }
      
    

    });
  });}

module.exports = setupSocket;
