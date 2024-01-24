import React, { useState, useContext, createContext } from "react";


const noteContext = createContext();

const dev_URL = process.env.REACT_APP_DEV_URL;

function getCookie(cookieName) {
  console.log(cookieName)
  const cookies = document.cookie.split('.');
  console.log("cookies = ",cookies)
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    console.log("cookie trimming =" ,cookie)
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(cookieName.length + 1);
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
          // Need to change : from the retriving from the cookie or session storage 
          "auth-token": getCookie("auth_token")
         },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log("existing data of the user " ,jsonData);
      setnotes(jsonData);
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
  // API call 4 : To edit exiting note.
  async function handleEditNote(id,title,description,tag) {
    console.log("id at the context side = " , id)
    try {
      const response = await fetch(`${dev_URL}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoiNjU5NTU4ODU0NmFlZjEyMDc1MzVhNjdhIn0sImlhdCI6MTcwNDg3NzE4OH0.0UfBodadf9kZNLpeexYY6nrvHOixiSAtUDLnBmUzqqQ",
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
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
}

export function UserNotes() {
  return useContext(noteContext);
}
