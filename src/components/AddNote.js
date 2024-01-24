import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserNotes } from "../Context/NoteContext";

export default function AddNote() {
    // Function : To take title,description and tag as argument to make a new note.
  const { handleAddNote } = UserNotes();
  // create a object in state with name and values. which need to be update on user entered input and then need to pass as arugement in the given function.
  const [note,setnote] = useState({title : "",description: "",tag: ""})

  function handleClick(e) {
    e.preventDefault();
    // passing all required arugements
    handleAddNote(note.title,note.description,note.tag)
  }
  function onchange(e){
    // IMP spread operator : Making shallow copy of the existing note object.
    // Note State mangement : for numbers and string direct mutation of the state is possible and fesible , but for objects and arrays it not as it previous one.
   setnote({...note,[e.target.name] : e.target.value})
  }
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" name="title" onChange={onchange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" name="description" onChange={onchange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tag">
          <Form.Label>Tag</Form.Label>
          <Form.Control type="text" placeholder="Enter Tag" name="tag" onChange={onchange} />
        </Form.Group>
        <Button variant="primary" onClick={handleClick} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
