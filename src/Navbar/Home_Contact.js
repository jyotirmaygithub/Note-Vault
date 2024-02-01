import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Home_Contact() {
  const location = useLocation();
  return (
    <div className="flex space-x-8 justify-center items-center">
      <Link
        to="/about"
        className={`nav-link ${
          location.pathname === "/about" ? "underline text-white" : "text-white"
        }`}
      >
        About
      </Link>
      <Link
        to="/contact"
        className={`nav-link ${
          location.pathname === "/contact" ? "underline text-white" : "text-white"
        }`}
      >
        Contact
      </Link>
    </div>
  );
}
