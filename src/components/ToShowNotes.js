import React, { useState } from "react";
import { UserNotes } from "../Context/NoteContext";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { styled } from "@mui/system";
import { green, blue, red, brown, grey } from "@mui/material/colors";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PopUp from "../Pop-Up/PopUp";

function useStyles(n) {
  if (n === "work") {
    return brown[800];
  }
  if (n === "money") {
    return green[500];
  }
  if (n === "todos") {
    return blue[500];
  }
  if (n === "reminders") {
    return red[900];
  } else {
    return grey[700];
  }
}

export default function ShowNote({ note }) {
  const { handleDeleteNote } = UserNotes();

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  const StyledCard = styled(Card)({});
  const classes = useStyles(note.tag);
  return (
    <>
      <div className="mx-4 my-3">
        <StyledCard elevation={1}>
          <CardHeader
            avatar={
              <Avatar style={{ backgroundColor: `${classes}` }}>
                {note.tag && note.tag[0].toUpperCase()}
              </Avatar>
            }
            action={
              <div>
                <IconButton onClick={() => handleDeleteNote(note._id)}>
                  <DeleteOutlineOutlined className="bg" />
                </IconButton>
                <IconButton onClick={handleOpen}>
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <PopUp entireNote={note} open={open} openState={setOpen} />
              </div>
            }
            title={note.title}
            subheader={note.tag}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {note.description}
            </Typography>
          </CardContent>
        </StyledCard>
      </div>
      <div></div>
    </>
  );
}
