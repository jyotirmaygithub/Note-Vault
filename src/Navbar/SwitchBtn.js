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
    if (userLocation.pathname === "/create-notes") {
      setUserSpot("Available Notes");
    } else {
      setUserSpot("Create Note");
    }
  }, [userLocation.pathname]);

  async function handleClick() {
    if (userLocation.pathname === "/create-notes") {
      const result = await fetchAllNotes();

      if (result.length === 0) {
        navigate(`/existing-notes`);
      } else {
        navigate("/fetchingdata");
      }
    } else {
      navigate("/create-notes");
    }
  }
  return (
    <div>
      <Button
        onClick={handleClick}
        className="bg-white text-black rounded-full w-40 gap-1"
      >
        {userLocation.pathname !== "/create-notes" ? (
          <AddCircleOutlineIcon />
        ) : (
          ""
        )}
        {userSpot}
      </Button>
    </div>
  );
}
