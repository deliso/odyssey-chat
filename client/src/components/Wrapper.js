import React, { useEffect, useState } from "react";
import { Header } from './Header';
import { Chat } from './Chat';
import { Send } from './Send';
import $ from 'jquery';  

export function Wrapper() {
  
  const scrollToBottom = () => $("#message-log").scrollTop($("#message-log").scrollTop() + $("#end-of-messages-wrapper").position().top)

  const getCurrentTime = () => {
    let timestamp = new Date();
    let minutes = (timestamp.getMinutes()<10?'0':'') + timestamp.getMinutes(); // Attribution: https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-display-two-digit-numbers
    return`${timestamp.getHours()}:${minutes}h`;
  };

  const getCurrentDate = () => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthName = month[currentDate.getMonth()];
    let currentDay = currentDate.getDate();
    return `${monthName} ${currentDay}, ${currentYear}`;

  };



  
  const [messages, setMessages] = useState([]);
  //const [timeStamps, setTimestamps] = useState([]);

  const getMessages = async () => {
    try {
      const response = await fetch('http://localhost:5001/')
      const jsonMessages = await response.json()
      setMessages(jsonMessages);

    } catch (err) {
      console.error(err.message);
    }
  }
  

  const [newMessage, setNewMessage] = useState('');
  const [computerMessage, setComputerMessage] = useState('');

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { newMessage }
      const response = await fetch('http://localhost:5001/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      document.getElementById('user-input').value = '';
      setNewMessage('');
      getMessages();
      setTimeout(scrollToBottom, 50);
    } catch (err) {
      console.error(err.message);
    } finally {
        const computerBody = { computerMessage }
        const computerResponse = await fetch('http://localhost:5001/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(computerBody)
      })
      }
      setTimeout(getMessages, 1000)
      setTimeout(scrollToBottom, 1050);
    }

  const onClickButton = async () => {
    await fetch('http://localhost:5001/', {method: "DELETE"})
    getMessages();
  }

  useEffect(() => {
    getMessages();
  }, []);


  return (
    <div id='chat-wrapper'>
      <Header onClick={onClickButton}/>
      <Chat messages={messages}/>
      <Send onSubmitForm={onSubmitForm} setNewMessage={setNewMessage}/>
    </div>
  )
}