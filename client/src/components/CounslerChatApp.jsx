import React, { useEffect, useState } from "react";
import { connectSocket, getSocket } from "../socket";
import ChatWindow from "./ChatWindow";
import { Card } from "primereact/card";
import useAuth from "../hooks/useAuth";
import { Button } from "primereact/button";
const CounselorChatApp = () => {

    const {_id:userId,role,imgUrl}=useAuth() 
  const [chatWith, setChatWith] = useState(null);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
   const socket = connectSocket(userId, role,imgUrl);
    
    socket.on("chatStarted", ({ userId }) => {
      setChatWith(userId);
    });

    socket.on("chatEnded", () => {
      setChatWith(null);
      socket.emit("setAvailable"); 
    });
    
    return () => {
      socket.emit("setUnavailable");
      socket.disconnect();
    };
  }, [userId, role]);

  const toggleAvailability = () => {
    const socket = getSocket();
    if (!available) {
      socket.emit("setAvailable");
    } else {
      socket.emit("setUnavailable");
    }

    setAvailable((prev) => !prev);
  };
  const handleEndChat = () => {
    const socket = getSocket();
    socket.emit("endChat", { otherId:chatWith});
  };

  return (
    <div className="p-d-flex p-jc-center p-mt-6">
      <div className="p-col-12 p-md-6">
      <p>Status: {available ? "✅ Available" : "❌ Unavailable"}</p>
      <Button label= {available ? "Go Unavailable" : "Become Available"} onClick={toggleAvailability}/>
       
        {(available&&!chatWith) ? (
          <Card title="Waiting for a user to chat...">
            <p>This window will activate when a user starts a chat with you.</p>
          </Card>
        ) :chatWith? (
          <ChatWindow chatWith={chatWith} onEndChat={handleEndChat} />
        ):<></>}
      </div>
    </div>
  );
};

export default CounselorChatApp;