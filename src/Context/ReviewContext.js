import React, { useContext, createContext } from "react";
import { UserNotes } from "./NoteContext";

const reviewContext = createContext();

export function ReviewContextFunc(props) {
  const { getCookie } = UserNotes();

  async function handleComment(title, message) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/feedBack/userFeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("auth_token"),
          },
          body: JSON.stringify({ title, message }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  return (
    <reviewContext.Provider value={{ handleComment }}>
      {props.children}
    </reviewContext.Provider>
  );
}

export function FeedbackContext() {
  return useContext(reviewContext);
}
