import React, { useEffect } from "react";
import { UserNotes } from "../Context/NoteState";
import ShowNote from "./ShowNote";

export default function Note() {
  const { notes, fetchAllNotes } = UserNotes();
  useEffect(() => {
    fetchAllNotes();
  }, []);
  return (
    <div className="flex space-x-6">
      {/* {notes.map((data) => {
        return <ShowNote note={data} />;
      })} */}
    </div>
  );
}
