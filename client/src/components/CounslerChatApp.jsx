import React, { useEffect, useState } from "react";
import { connectSocket, getSocket } from "../socket";
import ChatWindow from "./ChatWindow";
import { Card } from "primereact/card";
import useAuth from "../hooks/useAuth";
import { Button } from "primereact/button";
import Loading from "./Loading";
const CounselorChatApp = () => {

    const {_id:userId,role,imgUrl}=useAuth() 
    const [chatWith, setChatWith] = useState(sessionStorage.getItem("chatWith"));
  const [chatWithUsername, setChatWithusername] = useState(null);
  const [available, setAvailable] = useState(()=>{const avail=sessionStorage.getItem("available")
  return avail?JSON.parse(avail):false});
  const [isSocketConnected,setIsSocketConnected]=useState(false)
  useEffect(()=>{sessionStorage.setItem("available",available)
},[available])
let chatStartTime,chatEndTime;

  useEffect(() => {
   const socket = connectSocket(userId, role);
   setIsSocketConnected(true)
    
    socket.on("chatStarted", ({ userId,username }) => {
    chatStartTime=new Date()
    setChatWithusername(username)
    console.log(username)
      setChatWith(userId);
      sessionStorage.setItem("chatWith",userId)

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
    chatEndTime=new Date()
    const durationInSeconds = (chatEndTime - chatStartTime) / 1000;
    const socket = getSocket();
    socket.emit("endChat", { otherId:chatWith});
  };
if(!isSocketConnected)return <Loading/>
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
          <ChatWindow chatWith={chatWith} chatWithUsername={chatWithUsername} onEndChat={handleEndChat} />
        ):<></>}
      </div>
    </div>
  );
};

export default CounselorChatApp;