import React, { useState,useEffect } from "react";
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
import PopUp from "../Pop-Up/PopUp"
import { States_Func } from "../Context/Context";

export default function ShowNote(props, { n }) {
  let { note } = props;
  const { handleDeleteNote, handleEditNote } = UserNotes();
  const {showModal,setShowModal} = States_Func()
  console.log("value of showmodal on toshownotes file = ", showModal)
  const [noteObjvalue, setNoteObj] = useState({
    title: "",
    description: "",
    tag: "",
  });
  // Note : Instead of making three state , i did it with one only afte passing an object into it.
  const [combinedState, setCombinedState] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
  });

  function handleIconClick() {
    setShowModal(true);
  }

  // function handleCloseModal(e) {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   setShowModal(false);
  // }

  function handleClick(id) {
    handleEditNote(
      id,
      noteObjvalue.title,
      noteObjvalue.description,
      noteObjvalue.tag
    );
  }
  // function onchange(e) {
  //   setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  //   setNoteObj({ ...noteObjvalue, [e.target.name]: e.target.value });
  // }

  const StyledCard = styled(Card)({
    // Add any additional styles you need for the Card component
  });

  const useStyles = (n) => {
    return {
      avatar: {
        backgroundColor: () => {
          if (n.category === "work") {
            return yellow[700];
          }
          if (n.category === "money") {
            return green[500];
          }
          if (n.category === "todos") {
            return pink[500];
          }
          return blue[500];
        },
      },
      // Add any additional styles you need
    };
  };

  const classes = useStyles(n);
  return (
    <>
      <div>
        <StyledCard elevation={1} className={classes.test}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {note.tag[0].toUpperCase()}
              </Avatar>
            }
            action={
              <div>
                <IconButton onClick={() => handleDeleteNote(note._id)}>
                  <DeleteOutlineOutlined />
                </IconButton>
                <IconButton onClick={() => handleIconClick(note._id)}>
                  <ModeEditOutlineOutlinedIcon />
                  <PopUp />
                </IconButton>
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
