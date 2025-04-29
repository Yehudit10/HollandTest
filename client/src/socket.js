import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId, role) => {
  socket = io("http://localhost:4000", {
    query: { userId, role },
  });

  return socket;
};

export const getSocket = () => socket;
