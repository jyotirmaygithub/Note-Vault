import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

export default function SwitchBtn() {
  const userLocation = useLocation();
  const navigate = useNavigate();
  const [userSpot, setUserSpot] = useState("Add Note");

  useEffect(() => {
    if (userLocation.pathname === "/existing-notes") {
      setUserSpot("Create Note");
    } else if (userLocation.pathname === "/create-notes") {
      setUserSpot("Available Notes");
    }
  }, [userLocation.pathname]);

  function handleClick() {
    if (userLocation.pathname === "/existing-notes") {
      navigate("/create-notes");
    } else if (userLocation.pathname === "/create-notes") {
      navigate("/fetchingdata");
    }
  }
  return (
    <div>
      <Button
        onClick={handleClick}
        className="bg-white text-black px-4 py-2 rounded-full"
      >
        {userSpot}
      </Button>
    </div>
  );
}
