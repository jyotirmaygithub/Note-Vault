import React, { useState, useEffect, useContext, createContext } from "react";

const noteContext = createContext();

const dev_URL = process.env.REACT_APP_DEV_URL;

const cookies = document.cookie;
const cookieArray = cookies.split("; ");
function getCookie(cookieName) {
  
  for (const cookie of cookieArray) {
    if (cookie.startsWith(`${cookieName}=`)) {
      // Extract and return the value of the cookie
      const cookieValue = cookie.split("=")[1];
      return cookieValue;
    }
  }
  
  return null;
}


export function NoteContextFun(props) {
  // Use "props" instead of "{ Children }"
  const [notes, setnotes] = useState([]);

  // Fetching, adding, updating and deleting will be done through API calls.
  // API call 1: To fetch all existing notes.
  async function fetchAllNotes() {
    try {
      const response = await fetch(`${dev_URL}/api/notes/fetchusernote`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getCookie("auth_token"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log("existing data of the user ", jsonData);
      setnotes(jsonData);
      return jsonData;
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
          "auth-token": getCookie("auth_token"),
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
  // API call 4 : To edit exiting note.
  async function handleEditNote(id, title, description, tag) {
    console.log("id at the context side = ", id);
    try {
      const response = await fetch(`${dev_URL}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getCookie("auth_token"),
           },
        body: JSON.stringify({ title, description, tag }),
      });
      fetchAllNotes();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  return (
    <noteContext.Provider
      value={{
        notes,
        setnotes,
        fetchAllNotes,
        handleDeleteNote,
        handleEditNote,
        getCookie
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
}

export function UserNotes() {
  return useContext(noteContext);
}
