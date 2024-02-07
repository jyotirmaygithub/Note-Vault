import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { UpdateUI } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { UserNameContext } from "../../Context/UserNameContext";
import { ContactSupport, Info, Logout } from "@mui/icons-material";

export default function UserName() {
  const { userName } = UserNameContext();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [response, setResponse] = useState(false);
  const { deleteAuthTokenCookie, checkCookie } = UpdateUI();
  const navigate = useNavigate();

  console.log("lets look at username = ", userName);
  useEffect(() => {
    setResponse(checkCookie("auth_token"));
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

  function handleAbout() {
    navigate(`/about`);
  }

  function handleContact() {
    navigate(`/contact`);
  }

  return (
    <>
      {response && (
        <Avatar
          onClick={handleClick}
          className="bg-white text-black font-bold cursor-pointer"
        >
          {userName && userName[0].toUpperCase()}
        </Avatar>
      )}
      <Popover
        className="mt-16"
        open={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="p-2 space-y-1">
          <Typography
            className="gap-1 hover:underline cursor-pointer"
            onClick={handleAbout}
          >
            <ContactSupport className="text-green-800 text-xl" />
            About
          </Typography>
          <hr />
          <Typography
            className="gap-2 hover:underline cursor-pointer"
            onClick={handleContact}
          >
            <Info className="text-blue-500 text-xl" />
            Contact
          </Typography>
          <hr />
          <Typography
            className="gap-1 hover:underline cursor-pointer"
            onClick={handleLogout}
          >
            <Logout className="text-red-600 text-xl" />
            Log out
          </Typography>
        </div>
      </Popover>
    </>
  );
}
