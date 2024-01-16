import React from 'react'
import {UserNotes} from "../Context/NoteState"
import ShowNote from './ShowNote';

export default function Note() {
    const {notes} = UserNotes();
  return (
    <div className='flex space-x-6'>
      {notes.map((data)=>{
        return (
          <ShowNote note={data}/>
        );
      })}
    </div>
  )
}
