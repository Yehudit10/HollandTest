const { Server } = require("socket.io");

const availableCounselors = new Map();
const activeChats = new Map();
const userSocketMap = new Map(); 
function setupSocket(server) {
  
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      credentials: true,
    },
  });
  io.listen(4000);
  io.on("connection", (socket) => {
    
    const { userId, role } = socket.handshake.query;
  
    socket.on("identify", (userId) => {
      
      userSocketMap.set(userId,socket.id );
      socket.userId = userId; // optionally store on socket for later
      console.log(`User ${userId} is connected with socket ${socket.id}`);
    });


    if (role === "user") {
      socket.emit("availableCounselors", Array.from(availableCounselors.keys()));
    }
  
    socket.on("startChat", ({ counselorId }) => {
      if (role === "user" && availableCounselors.has(counselorId)) {
        const counselorSocketId = availableCounselors.get(counselorId);
    
        const counselorSocket = io.sockets.sockets.get(counselorSocketId);
        if (counselorSocket) {
          availableCounselors.delete(counselorId);
          activeChats.set(counselorId, userId);
          io.emit("availableCounselors", Array.from(availableCounselors.keys()));
          counselorSocket.emit("chatStarted", { userId, counselorId });
          socket.emit("chatStarted", { userId, counselorId });
        }
      }
    });
    socket.on("endChat", ({ counselorId, userId }) => {
      if (
        (role === "user" && activeChats.get(counselorId) === userId) ||
        (role === "counselor" && activeChats.has(userId))
      ) {
        const counselorSocketId = availableCounselors.get(counselorId) || socket.id;
        const counselorSocket = io.sockets.sockets.get(counselorSocketId);
    
        activeChats.delete(counselorId);
        availableCounselors.set(counselorId, counselorSocketId);
        io.emit("availableCounselors", Array.from(availableCounselors.keys()));
    
        // Notify both
        socket.emit("chatEnded");
        if (counselorSocket) {
          counselorSocket.emit("chatEnded");
        }
      }
    });
    socket.on("sendMessage", ({ to, message }) => {
      const targetSocket = io.sockets.sockets.get(userSocketMap.get(to));
      if (targetSocket) {
        targetSocket.emit("receiveMessage", { from: socket.id, message });
      }
    });
    socket.on("setAvailable", () => {
      if (role === "counselor") {
        availableCounselors.set(userId, socket.id);
        io.emit("availableCounselors", Array.from(availableCounselors.keys()));
      }
    });
  
    socket.on("setUnavailable", () => {
    
      if (role === "counselor") {

        availableCounselors.delete(userId);
        io.emit("availableCounselors", Array.from(availableCounselors.keys()));
      }
    });
  
    socket.on("disconnect", () => {
      if (role === "counselor") {
        availableCounselors.delete(userId);
        io.emit("availableCounselors", Array.from(availableCounselors.keys()));
      }

      if (socket.userId) {
        userSocketMap.delete(socket.userId);
        console.log(`User ${socket.userId} disconnected`);
      }


    });
  });}

module.exports = setupSocket;
