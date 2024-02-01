import React from "react";
import { Avatar } from "@mui/material";
import { UserNotes } from "../Context/NoteContext";

export default function UserName() {
  const { notes } = UserNotes();
  return (
    <>
      <Avatar className="bg-white text-black font-bold">
        {notes[0].username[0].toUpperCase()}
      </Avatar>
    </>
  );
}
