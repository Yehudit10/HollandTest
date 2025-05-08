import React, { useState, useEffect, useRef } from "react";
import { getSocket } from "../../socket";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import useAuth from "../../hooks/useAuth";
import { Avatar } from "primereact/avatar";
import useGetFilePath from "../../hooks/useGetFilePath";

const ChatWindow = ({ chatWith,chatWithUsername, onEndChat,shareDetails }) => {

const {imgUrl}=useAuth()
const socket = getSocket();
const [messages, setMessages] = useState(()=>{const savedMsgs=sessionStorage.getItem(`messages-${chatWith}`)
return savedMsgs?JSON.parse(savedMsgs):[]});
  const [input, setInput] = useState("");
  const chatEndRef = useRef();
 const {getFilePath}=useGetFilePath()
 useEffect(()=>{sessionStorage.setItem(`messages-${chatWith}`,JSON.stringify(messages))},[messages])

  useEffect(() => {
    
    const handleReceive = ({ from, message }) => {
      setMessages((prev) => [...prev, { from, message }]);
      
    };
    
    socket.on("receiveMessage", handleReceive);
    socket.on("chatEnded", onEndChat);

    return () => {
      socket.off("receiveMessage", handleReceive);
      socket.off("chatEnded", onEndChat);
    };
  }, [onEndChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const msg = { profile:shareDetails===false?"":imgUrl, to: chatWith, message: input };
      socket.emit("sendMessage", msg);
      setMessages((prev) => [...prev, { from: "me", message: input }]);
      setInput("");
    }
  };

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
    <Card title={`Chat with ${chatWithUsername||"Anonymous User"}`} style={{width:'70%' }} className="h-full">
      <ScrollPanel style={{ height: '250px', marginBottom: '1rem' }}>
        <div style={{
              marginTop: '2rem',
            }}></div>
        {messages.map((msg, i) => (
            
          <div
            key={i}
            style={{
              textAlign: msg.from === "me" ? "right" : "left",
              marginTop: '0.5rem',
            }}
          >
         
<div style={{display:'inline-flex', gap:'5px'}}>
        {msg.from !== "me"&& <Avatar
            icon="pi pi-user"
            image={getFilePath(msg.from)}
            shape="circle"
            className="p-mr-2"
            style={{ cursor: 'pointer' }} />}

            <div
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                backgroundColor: msg.from === "me" ? '#2196F3' : '#f4f4f4',
                color: msg.from === "me" ? '#fff' : '#000',
              }}
            >
              {msg.message}
            </div></div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </ScrollPanel>

      <div
  className="p-d-flex p-ai-center"
  style={{
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    gap: '0.5rem',
  }}
>
  <InputText
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="הקלד את הודעתך..."
    style={{
      flex: 1,
      borderRadius: '2rem',
      padding: '0.75rem 1rem',
      border: '1px solid #cce0ff',
    }}
  />

  <Button
    icon="pi pi-send"
    onClick={sendMessage}
    className="p-button-rounded p-button-primary"
    style={{
      width: '3rem',
      height: '3rem',
      borderRadius: '2rem',
    }}
  />

  <Button
    icon="pi pi-times"
    onClick={()=>{
      const socket=getSocket()
      socket.emit('endChat',{otherId:chatWith})
    }}
    className="p-button-rounded p-button-secondary"
    style={{
      width: '3rem',
      height: '3rem',
      backgroundColor: '#dfe7fd',
      color: '#002b80',
      border: 'none',
    }}
  />
</div>
    </Card></div>
  );
};

export default ChatWindow;