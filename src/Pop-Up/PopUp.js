import React from "react";
import Dialog from "./Dialog";

export default function FormDialog({ open, openState, entireNote }) {
  return (
    <div>
      <Dialog entireNote={entireNote} open={open} openState={openState} />
    </div>
  );
}
