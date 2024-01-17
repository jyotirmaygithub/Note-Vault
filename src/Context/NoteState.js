import { useState, useContext, createContext } from "react";

const noteContext = createContext();
const dev_URL = "http://localhost:5000";

export function NoteContextFun(props) {
  // Use "props" instead of "{ Children }"
  const [notes, setnotes] = useState();

  // Fetching, adding and deleting will be done through API calls.
  // API call - To fetch all existing notes.

  async function fetchAllNotes() {
    const response = await fetch(`${dev_URL}/api/notes/fetchusernote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonData = await response.json();
    console.log(jsonData);
  }

  // To delete note
  function handleDeleteNote(id) {
    let newNotes = notes.filter((note) => note._id !== id);
    setnotes(newNotes);
  }
  // To edit note
  function handleEditNote() {}
  return (
    <noteContext.Provider
      value={{
        notes,
        setnotes,
        fetchAllNotes,
        // handleAddNote,
        handleDeleteNote,
        handleEditNote,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
}

export function UserNotes() {
  return useContext(noteContext);
}
