import React from "react";

export function Send ({onSubmitForm, newMessage, setNewMessage}) {
  

  return (
    <div>
      <form id="user-form" onSubmit={onSubmitForm} >
        <input 
          type="text" 
          name="user-input" 
          id="user-input" 
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)} />
        <input type="submit" value="Send" name="submit" id="submit" className="basic-button" />
      </form>
    </div>
  )
}