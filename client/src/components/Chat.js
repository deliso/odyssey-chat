import React from "react";

export function Chat({ messages }) {
  return (
      <>
      <div id='message-log'>
          {messages.map((message) => {
            console.log('message' + message.message, 'timestamp' + message.timestamp);
            return (
            <>
              <div className={message.user_id === 'user' ? 'user-message' : 'computer-message'} key={`"message-${message.timestamp}"`}>{message.message}</div>
              <div className={message.user_id === 'user' ? 'user-timestamp' : 'computer-timestamp'} key={`"timestamp-${message.timestamp}"`}>{message.timestamp}</div>
            </>
            )
          })}
          <div id="end-of-messages-wrapper"></div>
      </div>
      
      </>
  )
}

