import React, { useState, useEffect } from "react";
import { ConnectSocket,getSocket } from "../socket";
import CounselorList from "./CounslersList";
import ChatWindow from "./ChatWindow";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";


import {selectToken} from "../features/auth/authSlice"
import { useSelector } from "react-redux";
const ChatApp = () => {
  const token = useSelector(selectToken)
    const {_id:userId,role,imgUrl,username}=useAuth() 
    const [chatWith, setChatWith] = useState(sessionStorage.getItem("chatWith"));
  const [chatWithUsername, setChatWithusername] = useState(sessionStorage.getItem("chatWithUsername"));
const [visible,setVisible]=useState(false)
const[shareDetails,setShareDetails]=useState(JSON.parse(sessionStorage.getItem("shareDetails")))
  const [isSocketConnected,setIsSocketConnected]=useState(false)

  useEffect(()=>{if(chatWith)sessionStorage.setItem("chatWith",chatWith)
    else sessionStorage.removeItem("chatWith")
  },[chatWith])
  useEffect(()=>{
    if(chatWithUsername)
    sessionStorage.setItem("chatWithUsername",chatWithUsername) 
  else 
    sessionStorage.removeItem("chatWithUsername")
},[chatWithUsername])
  useEffect(()=>{if(shareDetails)sessionStorage.setItem("shareDetails",JSON.stringify(shareDetails))
    else sessionStorage.removeItem("shareDetails")
  },[shareDetails])
  useEffect(() => {
    const socket=ConnectSocket(token);
    setIsSocketConnected(true)
    socket.on("chatStarted", ({ counselorId }) => {
      setChatWith(counselorId);
      //sessionStorage.setItem("chatWith",counselorId)
    });
    return () => {
       
      if(!chatWith&&(!sessionStorage.getItem("notifications")||JSON.parse(sessionStorage.getItem("notifications")).length===0))
      {
        
        // if(chatWith)
        // socket.emit('endChat',{otherId:chatWith})
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
    setVisible(false)
}
const startChat=()=>{
    const socket = getSocket();
    setShareDetails(true);
    socket.emit("startChat",{counselorId:chatWith,username});
    setVisible(false)
}
  const handleEndChat = () => {
    //const socket = getSocket();
    //socket.emit("endChat", { otherId:chatWith });
    sessionStorage.removeItem(`messages-${chatWith}`)
    setChatWith(null);
    setChatWithusername(null)
    setShareDetails(null)
    //sessionStorage.removeItem("chatWith")
  };

  return (
     <div className="p-d-flex p-jc-center p-mt-6">
      <div className="p-col-12 p-md-6">
       
            <Dialog
            header="שיתוף פרופיל"
            visible={visible}
            onHide={startAnonymousChat}
            style={{ width: '30vw' }}
            modal
            footer={
              <div className="flex justify-end gap-2">
                <Button label="לא" icon="pi pi-times" className="p-button-text" onClick={startAnonymousChat } />
                <Button label="כן, שתף" icon="pi pi-check" onClick={startChat} autoFocus />
              </div>
            }
          >
            <p>האם אתה רוצה לשתף את שם המשתמש והפרופיל שלך?</p>
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