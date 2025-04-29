// socket.js
const { Server } = require("socket.io");

const availableCounselors = new Map();

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const { userId, role } = socket.handshake.query;
  
    // If the user is not a counselor, send them the current available list
    if (role === "user") {
      socket.emit("availableCounselors", Array.from(availableCounselors.keys()));
    }
  
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
    });
  });}

module.exports = setupSocket;
