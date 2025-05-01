const { Server } = require("socket.io");

const availableCounselors = new Map();
//const activeChats = new Map();
const socketsMap = new Map();
const notifyWaitList = new Map();
function setupSocket(server) {
  
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      credentials: true,
    },
  });
  io.listen(4000);
  io.on("connection", (socket) => {
    
    const { userId, role,imgUrl } = socket.handshake.query;
    socketsMap.set(userId,socket.id)
    if (role === "user") {
      socket.emit("availableCounselors", Array.from(availableCounselors.keys()));
    }
  
    socket.on("startChat", ({ counselorId }) => {
      if (role === "user" && availableCounselors.has(counselorId)) {
        const counselorSocketId = availableCounselors.get(counselorId);
        const counselorSocket = io.sockets.sockets.get(counselorSocketId);
        if (counselorSocket) {
          availableCounselors.delete(counselorId);
          //activeChats.set(counselorId, userId);
          
          io.emit("availableCounselors", Array.from(availableCounselors.keys()));
          counselorSocket.emit("chatStarted", {userId });
          socket.emit("chatStarted", { counselorId });
        }
      }
    });
    socket.on("endChat", ({ otherId }) => {
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
      }
    //}
    
    );
    socket.on("sendMessage", ({ to, message }) => {

      const targetSocket = io.sockets.sockets.get(socketsMap.get(to));
      if (targetSocket) {
        targetSocket.emit("receiveMessage", { from: imgUrl, message });
      }
    });
    socket.on("setAvailable", () => {
      if (role === "counselor") {
        availableCounselors.set(userId, socket.id);
        io.emit("availableCounselors", Array.from(availableCounselors.keys()));
        const socketSet = notifyWaitList.get(userId);
        if (!socketSet) return;
        socketSet.forEach(socketId=>io.to(socketId).emit("NotifyCounselorAvailable", { counselorId:userId })) ;
        notifyWaitList.delete(userId); 
      }
    });
  
    socket.on("setUnavailable", () => {
    
      if (role === "counselor") {

        availableCounselors.delete(userId);
        io.emit("availableCounselors", Array.from(availableCounselors.keys()));
      }
    });
  

    socket.on("notifyWhenAvailable", ({ counselorId }) => {
      if (!notifyWaitList.get(counselorId) )notifyWaitList.set(counselorId,[]);
      if (!notifyWaitList.get(counselorId).includes(socket.id)) {
        notifyWaitList.get(counselorId).push(socket.id);
      }
    });


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
