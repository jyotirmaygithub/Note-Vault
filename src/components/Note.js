import React from 'react'
import {UserNotes} from "../Context/NoteState"

export default function Note() {
    const {notes} = UserNotes();
  return (
    <div>
      {notes.map((note)=>{
        return (console.log(note));
      })}
    </div>
  )
}
