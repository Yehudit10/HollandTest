import React, { useEffect, useState } from "react";
import { connectSocket, getSocket } from "../socket";
import ChatWindow from "./ChatWindow";
import { Card } from "primereact/card";
import useAuth from "../hooks/useAuth";
import { io } from "socket.io-client";
import { Button } from "primereact/button";
const CounselorChatApp = () => {
    const {_id:userId,role}=useAuth() 
  const [inChat, setInChat] = useState(false);
  const [chatWith, setChatWith] = useState(null);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
   const socket = connectSocket(userId, role);
    
    socket.on("chatStarted", ({ userId }) => {
      setChatWith(userId);
      setInChat(true);
    });

    socket.on("chatEnded", () => {
      setInChat(false);
      setChatWith(null);
      socket.emit("setAvailable"); // allow new users to see this counselor
    });
    
    return () => {
      socket.emit("setUnavailable");
      socket.disconnect();
    };
  }, [userId, role]);

  const toggleAvailability = () => {
    const socket = getSocket();
    console.log(socket)
    if (!available) {
      socket.emit("setAvailable");
    } else {
      socket.emit("setUnavailable");
    }

    setAvailable((prev) => !prev);
  };
  const handleEndChat = () => {
    const socket = getSocket();
    socket.emit("endChat", { userId: chatWith, counselorId: userId });
    setInChat(false);
    setChatWith(null);
    socket.emit("setAvailable");
  };

  return (
    <div className="p-d-flex p-jc-center p-mt-6">
      <div className="p-col-12 p-md-6">
      <p>Status: {available ? "✅ Available" : "❌ Unavailable"}</p>
      <Button label= {available ? "Go Unavailable" : "Become Available"} onClick={toggleAvailability}/>
       
        {(available&&!inChat) ? (
          <Card title="Waiting for a user to chat...">
            <p>This window will activate when a user starts a chat with you.</p>
          </Card>
        ) :inChat? (
          <ChatWindow counselorId={chatWith} onEndChat={handleEndChat} />
        ):<></>}
      </div>
    </div>
  );
};

export default CounselorChatApp;