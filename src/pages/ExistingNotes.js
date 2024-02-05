import React, { useEffect } from "react";
import { UserNotes } from "../Context/NoteContext";
import ShowNote from "../components/ToShowNotes";
import Welcome from "../components/Welcome";

export default function Note() {
  const { notes, fetchAllNotes } = UserNotes();
  // To show all the existing notes to the client
  useEffect(() => {
    fetchAllNotes();
  }, []);
  console.log("arar");
  return (
    <>
      <div className="flex flex-col my-4 mx-4 space-y-5">
        <div>
          <Welcome />
        </div>
        <div className="flex flex-wrap">
          {notes.length !== 0 ? (
            notes.map((data) => {
              return <ShowNote note={data} key={data._id} />;
            })
          ) : (
            <div className="w-full flex justify-center items-center mt-24">
              <h2>"Your thoughts, your notes: Create now</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
