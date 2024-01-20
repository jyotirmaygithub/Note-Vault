import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { UserNotes } from "../Context/NoteContext";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function ShowNote(props) {
  let { note } = props;
  const { handleDeleteNote, handleEditNote } = UserNotes();
  const [showModal, setShowModal] = useState(false);
  const [noteObjvalue, setNoteObj] = useState({
    title: "",
    description: "",
    tag: "",
  });
  // Note : Instead of making three state , i did it with one only afte passing an object into it.
  const [combinedState, setCombinedState] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
  });

  function handleIconClick(){
    setShowModal(true);
  };

  function handleCloseModal(e){
    if (e) {
      e.preventDefault();
    }
    setShowModal(false);
  };

  function handleClick(id) {
    handleEditNote(
      id,
      noteObjvalue.title,
      noteObjvalue.description,
      noteObjvalue.tag
    );
    console.log("this function is working with id ", id);
  }
  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value})
    setNoteObj({ ...noteObjvalue, [e.target.name]: e.target.value });
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{note.tag}</Card.Subtitle>
        <Card.Text>{note.description}</Card.Text>
        <div className="flex">
          {/* from here sending the id of the document which we want to delete from the database */}
          {/* handledeletenote is a function passing by using usecontex api */}
          <TrashIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleDeleteNote(note._id)}
          />
          <PencilSquareIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleIconClick(note._id)}
          />

          {/* Use EditModal component to update the note */}
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                value={combinedState.title}
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  onChange={onchange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                value={combinedState.description}
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  name="description"
                  onChange={onchange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="tag">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                value={combinedState.tag}
                  type="text"
                  placeholder="Enter Tag"
                  name="tag"
                  onChange={onchange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleCloseModal();
                handleClick(note._id);
              }}
            >
              Click me
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}
