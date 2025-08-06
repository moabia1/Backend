import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    socket.emit("ai-message", input);
    setInput("");
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance)

    socketInstance.on("ai-message-response", (response) => {
      const botReply = { sender: "bot", text: response };
      setMessages((prev) => [...prev, botReply])
    });
  },[])

  return (
    <div className="chat-container">
      <div className="chat-header">ChatBot</div>

      <div className="chat-history">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
