import { io } from "socket.io-client";

let socket;

export const ConnectSocket = (token) => {
  
  socket = io("http://localhost:4000", {
      extraHeaders: {
        authorization: `Bearer ${token}`
      }
  });

  return socket;
};

export const getSocket = () =>socket;
