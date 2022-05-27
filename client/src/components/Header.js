import React from "react";
import { Delete } from './Delete';

export function Header({ onClick }) {
  return (
    <div id='computer-name'>
      <div id="profile-picture">🧔🏽</div>
      <div id="profile-name"><strong>Homer of Khíos</strong></div>
      <Delete onClick={onClick}/>
    </div>

  )
}
