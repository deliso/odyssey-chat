import React from "react";

export function Chat({ messages }) {
  return (
    <div>
      <h1>Hello chat</h1>
      {messages.map(message => {
        return <div>{message.message}</div>
      })}
      
      
    </div>
  )
}

