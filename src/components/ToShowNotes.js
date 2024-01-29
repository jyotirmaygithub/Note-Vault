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
import { yellow, green, pink, blue } from "@mui/material/colors";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PopUp from "../Pop-Up/PopUp";

function useStyles(n) {
  console.log("value of n =", n);
  if (n === "work") {
    return yellow[700];
  }
  if (n === "money") {
    return green[500];
  }
  if (n === "todos") {
    return pink[500];
  }
  return blue[500];
}

export default function ShowNote({ note, tagName }) {
  const { handleDeleteNote } = UserNotes();

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const StyledCard = styled(Card)({
    // Add any additional styles you need for the Card component
  });

  const classes = useStyles(tagName);
  console.log("value of classes = ",classes)
  return (
    <>
      <div>
        <StyledCard elevation={1}>
          <CardHeader
            avatar={
              <Avatar
             style={{backgroundColor : `${classes}`}}

              >
                {note.tag[0].toUpperCase()}
              </Avatar>
            }
            action={
              <div>
                <IconButton onClick={() => handleDeleteNote(note._id)}>
                  <DeleteOutlineOutlined className="bg"/>
                </IconButton>
                <IconButton onClick={handleOpen}>
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <PopUp
                  open={open}
                  handleClose={handleClose}
                  noteTitle={note.title}
                  noteDesc={note.description}
                />
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
