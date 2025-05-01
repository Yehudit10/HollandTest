import React, { useState, useEffect } from "react";
import { connectSocket,getSocket } from "../socket";
import CounselorList from "./CounslersList";
import ChatWindow from "./ChatWindow";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
const ChatApp = () => {
    const {_id:userId,role,imgUrl}=useAuth() 
  const [chatWith, setChatWith] = useState(null);
  
const [r,setr]=useState(false)
  useEffect(() => {
    const socket=connectSocket(userId, role,imgUrl);
    setr(true)
    socket.on("chatStarted", ({ counselorId }) => {
      setChatWith(counselorId);
    });

    //return () => socket.disconnect();
  }, [userId, role]);

  const handleStartChat = (counselorId) => {
    const socket = getSocket();
    socket.emit("startChat", { counselorId });
  };

  const handleEndChat = () => {
    const socket = getSocket();
    socket.emit("endChat", { otherId:chatWith });
    setChatWith(null);
  };

  return (
     <div className="p-d-flex p-jc-center p-mt-6">
      <div className="p-col-12 p-md-6">
        {
        !r?<Loading/>:
        !chatWith? (
          <CounselorList onStartChat={handleStartChat} />
        ) : (
          <ChatWindow chatWith={chatWith} onEndChat={handleEndChat} />
        )}
      </div>
     </div>
  );
};

export default ChatApp;