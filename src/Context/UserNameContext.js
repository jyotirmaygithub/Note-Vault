import React, { useState, useEffect, useContext, createContext } from "react";
import { UserNotes } from "./NoteContext";
const nameContext = createContext();

export function UserNameContextFunc(props) {
  const { getCookie } = UserNotes();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    handleExistingUsername();
  }, []);

  async function handleExistingUsername() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/getuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("auth_token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userDocument = await response.json();
      setUserName(userDocument.name);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  return (
    <nameContext.Provider value={{ userName,handleExistingUsername }}>
      {props.children}
    </nameContext.Provider>
  );
}

export function UserNameContext() {
  return useContext(nameContext);
}
