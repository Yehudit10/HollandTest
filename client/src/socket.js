import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId, role,imgUrl) => {
  socket = io("http://localhost:4000", {
    query: { userId, role,imgUrl },
    
  });

  return socket;
};

export const getSocket = () =>socket;
