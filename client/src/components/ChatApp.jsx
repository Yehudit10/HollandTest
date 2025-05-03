import React, { useState, useEffect } from "react";
import { connectSocket,getSocket } from "../socket";
import CounselorList from "./CounslersList";
import ChatWindow from "./ChatWindow";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
const ChatApp = () => {
    const {_id:userId,role,imgUrl,username}=useAuth() 
    const [chatWith, setChatWith] = useState(sessionStorage.getItem("chatWith"));
  const [chatWithUsername, setChatWithusername] = useState(null);
const [visible,setVisible]=useState(false)
const[shareDetails,setShareDetails]=useState(false)
  const [isSocketConnected,setIsSocketConnected]=useState(false)
  useEffect(() => {
    const socket=connectSocket(userId, role);
    setIsSocketConnected(true)
    socket.on("chatStarted", ({ counselorId }) => {
      setChatWith(counselorId);
      sessionStorage.setItem("chatWith",counselorId)
    });
    return () => {
       
      if(socket.listeners("NotifyCounselorAvailable").length === 0)
      {
        if(chatWith)
        socket.emit('endChat',{otherId:chatWith})
          socket.disconnect()
      }
          
      };
    //return () => socket.disconnect();
  }, [userId, role]);
  const handleStartChat = (counselorId,counselorUsername) => {
    setChatWithusername(counselorUsername)
    setChatWith(counselorId)
    setVisible(true)
   
  };
const startAnonymousChat=()=>{
    const socket = getSocket();
  setShareDetails(false)
    socket.emit("startChat",{counselorId:chatWith});
}
const startChat=()=>{
    const socket = getSocket();
    setShareDetails(true);
    socket.emit("startChat",{counselorId:chatWith,username});
}
  const handleEndChat = () => {
    const socket = getSocket();
    socket.emit("endChat", { otherId:chatWith });
    setChatWith(null);
    sessionStorage.removeItem("chatWith")
  };

  return (
     <div className="p-d-flex p-jc-center p-mt-6">
      <div className="p-col-12 p-md-6">
       
            <Dialog
            header="שיתוף פרופיל"
            visible={visible}
            onHide={()=>{ startAnonymousChat(); setVisible(false)}}
            style={{ width: '30vw' }}
            modal
            footer={
              <div className="flex justify-end gap-2">
                <Button label="לא" icon="pi pi-times" className="p-button-text" onClick={()=>{ startAnonymousChat(); setVisible(false)}} />
                <Button label="כן, שתף" icon="pi pi-check" onClick={()=>{ startChat();setVisible(false)}} autoFocus />
              </div>
            }
          >
            <p>האם אתה רוצה לשתף את שם המשתמש והפרופיל שלך עם הצד השני בצ'אט?</p>
          </Dialog> {
        !isSocketConnected?<Loading/>:
        !chatWith? (
          <CounselorList onStartChat={handleStartChat} />
        ) : (
          <ChatWindow chatWith={chatWith} chatWithUsername={chatWithUsername} onEndChat={handleEndChat} shareDetails={shareDetails} />
        )}
      </div>
     </div>
  );
};

export default ChatApp;