import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { UpdateUI } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserNotes } from "../../Context/NoteContext";

export default function UserName() {
  const {getCookie } = UserNotes();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const { deleteAuthTokenCookie } = UpdateUI();
  const navigate = useNavigate();
  const  [userName, setUserName] = useState("")

  useEffect(() => {
    handleExistingUsername()
  }, []);

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
  async function handleExistingUsername() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/getuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("auth_token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);      
      }
      const userDocument = await response.json();  
      console.log("documents value = " , userDocument)
      setUserName(userDocument.name)  
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  return (
    <>
      <Avatar
        onClick={handleClick}
        className="bg-white text-black font-bold cursor-pointer"
      >
        {userName && userName[0].toUpperCase()}
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
