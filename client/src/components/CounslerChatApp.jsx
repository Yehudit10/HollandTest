import React, { useEffect, useState } from "react";
import { ConnectSocket, getSocket } from "../socket";
import ChatWindow from "./ChatWindow";
import { Card } from "primereact/card";
import useAuth from "../hooks/useAuth";
import { Button } from "primereact/button";
import Loading from "./Loading";



import {selectToken} from "../features/auth/authSlice"
import { useSelector } from "react-redux";
const CounselorChatApp = () => {
  const token = useSelector(selectToken)
    const {_id:userId,role,imgUrl}=useAuth() 
    const [chatWith, setChatWith] = useState(sessionStorage.getItem("chatWith"));
  const [chatWithUsername, setChatWithusername] = useState(sessionStorage.getItem("chatWithUsername"));
  const [available, setAvailable] = useState(()=>{const avail=sessionStorage.getItem("available")
  return avail?JSON.parse(avail):false});
  const [isSocketConnected,setIsSocketConnected]=useState(false)
  useEffect(()=>{sessionStorage.setItem("available",JSON.stringify(available))
},[available])
let chatStartTime,chatEndTime;
useEffect(()=>{if(chatWith)sessionStorage.setItem("chatWith",chatWith)
  else sessionStorage.removeItem("chatWith")
},[chatWith])
useEffect(()=>{if(chatWithUsername)sessionStorage.setItem("chatWithUsername",chatWithUsername)
  else sessionStorage.removeItem("chatWithUsername")
},[chatWithUsername])


const handleEndChat = () => {
  chatEndTime=new Date()
  const durationInSeconds = (chatEndTime - chatStartTime) / 1000;
  const socket = getSocket();
  sessionStorage.removeItem(`messages-${chatWith}`)
  //socket.emit("endChat", { otherId:chatWith});
};
  useEffect(() => {
   const socket = ConnectSocket(token);
   setIsSocketConnected(true)
    
    socket.on("chatStarted", ({ userId,username }) => {
    chatStartTime=new Date()
    setChatWithusername(username)
      setChatWith(userId);
      // sessionStorage.setItem("chatWith",userId)
      // sessionStorage.setItem("chatWithUsername",username)

    });

    socket.on("chatEnded", () => {
      sessionStorage.removeItem(`messages-${chatWith}`)
      setChatWith(null);
      setChatWithusername(null)
      // sessionStorage.removeItem("chatWith")
      // sessionStorage.removeItem("chatWithUsername")
      socket.emit("setAvailable"); 
    });
    
    return () => {
      //sessionStorage.removeItem("available")
     // socket.emit("endChat",{otherId:chatWith})
     if(!chatWith){
      socket.emit("setUnavailable");
      socket.disconnect();}
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
 
if(!isSocketConnected)return <Loading/>
  return (
    <div className="p-d-flex p-jc-center p-mt-6">
      <div className="p-col-12 p-md-6">

        
         
         {chatWith?<ChatWindow chatWith={chatWith} chatWithUsername={chatWithUsername} onEndChat={handleEndChat} />:
          (<><p>Status: {available ? "✅ Available" : "❌ Unavailable"}</p>
          <Button label= {available ? "Go Unavailable" : "Become Available"} onClick={toggleAvailability}/>
          {available?
            <Card title="Waiting for a user to chat...">
              <p>This window will activate when a user starts a chat with you.</p>
            </Card>:<></>}</>
          
        )
      }

        
      </div>
    </div>
  );
};

export default CounselorChatApp;