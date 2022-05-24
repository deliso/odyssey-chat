import React from "react";

export function Delete( { onClick }) {
  

  return (
    <div>
      <button id="clear-chat" className="basic-button" onClick={onClick}> Clear Chat </button>
    </div>
  )
}