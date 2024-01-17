import React, { useState, useContext, createContext } from "react";
import { json } from "react-router-dom";

const noteContext = createContext();
const dev_URL = "http://localhost:5000";

export function NoteContextFun(props) {
  // Use "props" instead of "{ Children }"
  const [notes, setnotes] = useState([]);

  // Fetching, adding and deleting will be done through API calls.
  // API call 1: To fetch all existing notes.
  async function fetchAllNotes() {
    try {
      const response = await fetch(`${dev_URL}/api/notes/fetchusernote`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoiNjU5NTU4ODU0NmFlZjEyMDc1MzVhNjdhIn0sImlhdCI6MTcwNDg3NzE4OH0.0UfBodadf9kZNLpeexYY6nrvHOixiSAtUDLnBmUzqqQ",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setnotes(jsonData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // API call 2 : To add note.

  async function handleAddNote(title, description, tag) {
    try {
      const response = await fetch(`${dev_URL}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoiNjU5NTU4ODU0NmFlZjEyMDc1MzVhNjdhIn0sImlhdCI6MTcwNDg3NzE4OH0.0UfBodadf9kZNLpeexYY6nrvHOixiSAtUDLnBmUzqqQ",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // API call 3 : To delete a note.
  async function handleDeleteNote(id) {
    try {
      const response = await fetch(`${dev_URL}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoiNjU5NTU4ODU0NmFlZjEyMDc1MzVhNjdhIn0sImlhdCI6MTcwNDg3NzE4OH0.0UfBodadf9kZNLpeexYY6nrvHOixiSAtUDLnBmUzqqQ",
        },
      });
      fetchAllNotes();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }
  // To edit note
  function handleEditNote() {}
  return (
    <noteContext.Provider
      value={{
        notes,
        setnotes,
        fetchAllNotes,
        handleAddNote,
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
