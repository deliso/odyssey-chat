import React, { useEffect, useState } from "react";
import { Chat } from './Chat';
import { Send } from './Send';

export function Wrapper() {
  
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await fetch('http://localhost:5001/')
      const jsonData = await response.json()
      setMessages(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  const [newMessage, setNewMessage] = useState('');

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { newMessage }
      const response = await fetch('http://localhost:5001/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      getMessages();
    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    getMessages();
  }, []);


  return (
    <div>
      <Chat messages={messages}/>
      <Send onSubmitForm={onSubmitForm} setNewMessage={setNewMessage}/>
    </div>
  )
}