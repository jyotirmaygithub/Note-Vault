import React from "react";
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <Navbar/>        
        <Router>
          <Routes>
          </Routes>
        </Router>
    </div>
  );
}
