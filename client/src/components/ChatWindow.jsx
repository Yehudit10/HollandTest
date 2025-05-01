import React, { useState, useEffect, useRef } from "react";
import { getSocket } from "../socket";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import useAuth from "../hooks/useAuth";
import { Avatar } from "primereact/avatar";
import useGetFilePath from "../hooks/useGetFilePath";

const ChatWindow = ({ chatWith, onEndChat }) => {
const socket = getSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef();
 const {getFilePath}=useGetFilePath()
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
      const msg = { to: chatWith, message: input };
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
    <Card title={`Chat with ${chatWith}`} style={{width:'70%' }} className="h-full">
      <ScrollPanel style={{ height: '250px', marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
            
          <div
            key={i}
            style={{
              textAlign: msg.from === "me" ? "right" : "left",
              marginBottom: '0.5rem',
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

      <div className="p-d-flex p-ai-center" style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
        <InputText
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, marginRight: '0.5rem' }}
        />
        <Button icon="pi pi-send" onClick={sendMessage} className="p-button-success" style={{ marginRight: '0.5rem' }} />
        <Button label="End" icon="pi pi-times" onClick={onEndChat} className="p-button-danger" />
      </div>
    </Card></div>
  );
};

export default ChatWindow;