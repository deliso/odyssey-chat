import React, { useEffect, useState } from "react";

export function Chat() {
  
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await fetch('http://localhost:5001/')
      const jsonData = await response.json()
      console.log(jsonData);
      setMessages(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  useEffect(() => {
    getMessages();
  }, []);

  console.log(messages);

  return (
    <div>
      <h1>Hello chat</h1>
      {messages.map(message => {
        return <div>{message.message}</div>
      })}
      
    </div>
  )
}