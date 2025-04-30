import React, { useState, useEffect, useRef } from "react";
import { getSocket } from "../socket";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import useAuth from "../hooks/useAuth";

const ChatWindow = ({ counselorId, onEndChat }) => {
//   const socket = getSocket();
const {_id}=useAuth()
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef();
 
  useEffect(() => {
    const socket = getSocket();
    const handleReceive = ({ from, message }) => {
        console.log(from, message)
      setMessages((prev) => [...prev, { from, message }]);
      
    };
    
    socket.on("receiveMessage", handleReceive);
    socket.on("chatEnded", onEndChat);
    socket.emit("identify", _id);
    return () => {
      socket.off("receiveMessage", handleReceive);
      socket.off("chatEnded", onEndChat);
    };
  }, [onEndChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const socket = getSocket();
    if (input.trim()) {
      const msg = { to: counselorId, message: input };
      socket.emit("sendMessage", msg);
      setMessages((prev) => [...prev, { from: "me", message: input }]);
      setInput("");
    }
  };

  return (
    <Card title={`Chat with ${counselorId}`} className="h-full">
      <ScrollPanel style={{ height: '250px' }} className="mb-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-mb-2 ${msg.from === "me" ? "p-text-right" : "p-text-left"}`}
          >
            <div
              className={`p-p-2 p-rounded p-shadow-1 ${
                msg.from === "me" ? "p-bg-primary p-text-white" : "p-bg-light"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </ScrollPanel>
      <div className="p-d-flex p-ai-center">
        <InputText
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="p-mr-2"
        />
        <Button icon="pi pi-send" onClick={sendMessage} className="p-button-success p-mr-2" />
        <Button label="End" icon="pi pi-times" onClick={onEndChat} className="p-button-danger" />
      </div>
    </Card>
  );
};

export default ChatWindow;