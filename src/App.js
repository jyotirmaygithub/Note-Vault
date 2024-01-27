import React from "react";
import Navbar from "./components/CustomNavbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { NoteContextFun } from "./Context/NoteContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import EnterBtn from "./pages/EnterBtn";
import ProgressCircle from "./pages/ProgressCircle";
import AddNote from "./pages/AddNote";
import ExistingNotes from "./pages/ExistingNotes";

export default function App() {
  return (
    <div className="App">
      <NoteContextFun>
        <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route exact path="/" element={<EnterBtn />} />
            <Route exact path="/create-notes" element={<AddNote />} />
            <Route path="/existing-notes" element={<ExistingNotes />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route
              exact
              path="/login/fetchingdata"
              element={<ProgressCircle />}
            />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </NoteContextFun>
    </div>
  );
}
