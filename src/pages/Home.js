import AddNote from "../components/AddNote";
import ToShowNotes from "../components/Note";

export default function Home() {
  return (
    <div className="container">
      {/*To add note to the database */}
      <AddNote />
      {/* calling to show user notes */}
      <ToShowNotes />
    </div>
  );
}
