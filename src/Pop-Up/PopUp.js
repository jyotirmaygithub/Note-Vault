import React from "react";
import Dialog from "./Dialog";

export default function FormDialog({open, handleClose,noteTitle,noteDesc,noteTag}) {

  return (
    <div>
      <Dialog
        open={open}
        handleClose={handleClose}
        TransitionDuration={1} noteTitle={noteTitle} noteDesc={noteDesc} noteTag={noteTag}
      />
    </div>
  );
}
