import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MyStyledTextField from "../components/MyStyledTextField";

export default function FormDialog({
  open,
  handleClose,
  noteTitle,
  noteDesc,
  noteTag,
}) {
  console.log(noteDesc, noteTitle, noteTag);

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Revamp Your Ideas</DialogTitle>
        <DialogContent className="space-y-4">
          <DialogContentText>
            Edit and elevate your existing notes effortlessly in the NoteVault
            app
          </DialogContentText>
          <MyStyledTextField
            onChange={onchange}
            label="Note Title"
            variant="outlined"
            name="title"
            value={noteTitle}
            fullWidth
            required
          />
          <MyStyledTextField
            onChange={onchange}
            label="Description"
            name="description"
            value={noteDesc}
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
