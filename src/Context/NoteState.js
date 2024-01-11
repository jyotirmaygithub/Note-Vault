import { useState, useContext, createContext } from "react";

const noteContext = createContext();

export function NoteContextFun(props) {
  // Use "props" instead of "{ Children }"
  return (
    <noteContext.Provider value={{}}>{props.children}</noteContext.Provider>
  );
}

export function UserNotes() {
  return useContext(noteContext);
}
