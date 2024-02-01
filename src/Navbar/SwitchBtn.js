import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
        className="bg-white text-black rounded-full w-44 gap-2"
      >
        {userLocation.pathname === "/existing-notes" ? <AddCircleOutlineIcon/> : ""}
        {userSpot}
      </Button>
    </div>
  );
}
