import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { UserNotes } from "../Context/NoteContext";

export default function SwitchBtn() {
  const userLocation = useLocation();
  const navigate = useNavigate();
  const [userSpot, setUserSpot] = useState("Add Note");
  const { fetchAllNotes } = UserNotes();

  useEffect(() => {
    if (userLocation.pathname === "/existing-notes") {
      setUserSpot("Create Note");
    } else if (userLocation.pathname === "/create-notes") {
      setUserSpot("Available Notes");
    }
  }, [userLocation.pathname]);

  async function handleClick() {
    if (userLocation.pathname === "/existing-notes") {
      navigate("/create-notes");
    } else if (userLocation.pathname === "/create-notes") {
      const result = await fetchAllNotes();

      if (result.length === 0) {
        navigate(`/existing-notes`);
      } else {
        navigate("/fetchingdata");
      }
    }
  }
  return (
    <div>
      <Button
        onClick={handleClick}
        className="bg-white text-black rounded-full w-44 gap-2"
      >
        {userLocation.pathname === "/existing-notes" ? (
          <AddCircleOutlineIcon />
        ) : (
          ""
        )}
        {userSpot}
      </Button>
    </div>
  );
}
