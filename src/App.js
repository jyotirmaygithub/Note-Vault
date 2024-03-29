import React from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NoteContextFun } from "./Context/NoteContext";
import { ContextFun } from "./Context/Context";
import { UserNameContextFunc } from "./Context/UserNameContext";
import { ReviewContextFunc } from "./Context/ReviewContext";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import EnterBtn from "./pages/EnterBtn";
import ProgressCircle from "./pages/ProgressCircle";
import AddNote from "./pages/AddNote";
import ExistingNotes from "./pages/ExistingNotes";
import Navabar from "./Navbar/Navabar";

export default function App() {
  return (
    <div className="App">
      <NoteContextFun>
        <ContextFun>
          <UserNameContextFunc>
            <ReviewContextFunc>
              <Router>
                <Routes>
                  <Route exact path="/" element={<EnterBtn />} />
                  <Route
                    exact
                    path="/create-notes"
                    element={
                      <>
                        <Navabar />
                        <AddNote />
                      </>
                    }
                  />
                  <Route
                    path="/existing-notes"
                    element={
                      <>
                        <Navabar />
                        <ExistingNotes />
                      </>
                    }
                  />
                  <Route
                    exact
                    path="/about"
                    element={
                      <>
                        <Navabar />
                        <About />
                      </>
                    }
                  />
                  <Route
                    exact
                    path="/contact"
                    element={
                      <>
                        <Navabar />
                        <Contact />
                      </>
                    }
                  />
                  <Route exact path="/login" element={<LogIn />} />
                  <Route
                    exact
                    path="/fetchingdata"
                    element={<ProgressCircle />}
                  />
                  <Route exact path="/signup" element={<SignUp />} />
                </Routes>
              </Router>
            </ReviewContextFunc>
          </UserNameContextFunc>
        </ContextFun>
      </NoteContextFun>
    </div>
  );
}
