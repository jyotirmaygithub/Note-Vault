import React, { useEffect } from "react";
import { UserNotes } from "../Context/NoteContext";
import ShowNote from "../components/ToShowNotes";

export default function Note() {
  const { notes, fetchAllNotes } = UserNotes();
  // To show all the existing notes to the client
  useEffect(() => {
    fetchAllNotes();
  }, []);
  return (
    <div className="flex space-x-6 flex-wrap">
      {notes.map((data) => {
        // {console.log(data.tag)}
        return <ShowNote note={data}  key={data._id}  tagName={data.tag}/>;
      })}
    </div>
  );
}
