import React from "react";
import Navbar from "./components/CustomNavbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import {NoteContextFun} from "./Context/NoteContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <div className="App"> 
    <NoteContextFun>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </NoteContextFun>       
    </div>
  );
}
