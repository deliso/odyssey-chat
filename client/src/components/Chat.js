import React from "react";

export function Chat({ messages }) {
  return (
      <>
      <div id='message-log'>
          {messages.map((message) => {
            console.log('message' + message.message, 'timestamp' + message.timestamp);
            return (
            <>
              <div className='user-message' key={`"message-${message.message}"`}>{message.message}</div>
              <div className='user-timestamp' key={`"message-${message.timestamp}"`}>{message.timestamp}</div>
            </>
            )
          })}
          <div id="end-of-messages-wrapper"></div>
      </div>
      
      </>
  )
}

