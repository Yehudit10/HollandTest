import React, { useState, useEffect } from "react";
import { connectSocket,getSocket } from "../socket";
import CounselorList from "./CounslersList";
import ChatWindow from "./ChatWindow";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
const ChatApp = () => {
    const {_id:userId,role}=useAuth() 
  const [inChat, setInChat] = useState(false);
  const [chatWith, setChatWith] = useState(null);
const [r,setr]=useState(false)
  useEffect(() => {
    const socket=connectSocket(userId, role);
    setr(true)
    socket.on("chatStarted", ({ counselorId }) => {
      setChatWith(counselorId);
      setInChat(true);
    });

    return () => socket.disconnect();
  }, [userId, role]);

  const handleStartChat = (counselorId) => {
    const socket = getSocket();
    socket.emit("startChat", { counselorId });
  };

  const handleEndChat = () => {
    const socket = getSocket();
    socket.emit("endChat", { counselorId: chatWith, userId });
    setInChat(false);
    setChatWith(null);
  };

  return (
     <div className="p-d-flex p-jc-center p-mt-6">
      <div className="p-col-12 p-md-6">
        {!r?<Loading/>:!inChat? (
          <CounselorList onStartChat={handleStartChat} />
        ) : (
          <ChatWindow counselorId={chatWith} onEndChat={handleEndChat} />
        )}
      </div>
     </div>
  );
};

export default ChatApp;