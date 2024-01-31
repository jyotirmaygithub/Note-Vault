import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MyStyledTextField from "../components/MyStyledTextField";

export default function FormDialog({ open, openState, entireNote }) {
  let { _id, title, description, tag } = entireNote;
  const [combinedState, setCombinedState] = useState({
    title: title,
    description: description,
    tag: tag,
  });
  // const [noteObjvalue, setNoteObj] = useState({
  //   title: "",
  //   description: "",
  //   tag: "",
  // });

  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
    // setNoteObj({ ...noteObjvalue, [e.target.name]: e.target.value });
  }

  function handleClose() {
    console.log("this is entire note in itself  = ", entireNote);
    openState(false);
    console.log("values of combined state = ", combinedState);
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Revamp Your Ideas</DialogTitle>
      <DialogContent className="space-y-4">
        <DialogContentText>
          Edit and elevate your existing notes effortlessly in the NoteVault app
        </DialogContentText>
        <MyStyledTextField
          onChange={onchange}
          label="Note Title"
          variant="outlined"
          name="title"
          value={combinedState.title}
          fullWidth
          required
        />
        <MyStyledTextField
          onChange={onchange}
          label="Description"
          name="description"
          value={combinedState.description}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="text-black">
          Cancel
        </Button>
        <Button onClick={handleClose} className="text-black">
          Edit Note
        </Button>
      </DialogActions>
    </Dialog>
  );
}
