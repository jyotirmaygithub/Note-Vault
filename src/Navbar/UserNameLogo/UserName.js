import React from "react";
import { Avatar } from "@mui/material";
import { UpdateUI } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

import { UserNotes } from "../../Context/NoteContext";

export default function UserName() {
  const { notes } = UserNotes();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const { deleteAuthTokenCookie } = UpdateUI();
  const navigate = useNavigate();

  if (!notes || notes.length === 0) {
    return null;
  }

  if (!notes[0].username) {
    return null;
  }

  function handleClick() {
    setAnchorEl(true);
  }

  function handleClose() {
    setAnchorEl(false);
  }

  function handleLogout() {
    deleteAuthTokenCookie("auth_token");
    navigate(`/login`);
  }
  
  return (
    <>
      <Avatar
        onClick={handleClick}
        className="bg-white text-black font-bold cursor-pointer"
      >
        {notes[0].username[0].toUpperCase()}
      </Avatar>
      <Popover
        className="mt-16"
        open={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography
          className="flex justify-center items-center h-12 w-24 gap-1 hover:underline cursor-pointer"
          onClick={handleLogout}
        >
          <LogoutIcon className="text-blue-500 text-xl" />
          Log out
        </Typography>
      </Popover>
    </>
  );
}
